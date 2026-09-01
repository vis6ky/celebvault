import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { celebrityStorage } from "./src/server/storage";
import {
  fetchWikipediaData,
  fetchWikidataClaims,
  fetchLiveNews,
  normalizeCelebrityFromSources,
} from "./src/server/externalSources";
import { generateContentWithFallback } from "./src/server/geminiHelper";
import { Celebrity } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Persistent Storage
  celebrityStorage.initDatabase();

  // 1. Health & Statistics Endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      indexedCelebrities: celebrityStorage.getCount(),
      timestamp: new Date().toISOString(),
      architecture: "Global External Information Aggregator & Multi-Source Index",
    });
  });

  // 2. High-Performance Image Proxy (bypasses upstream hotlinking/CORS restrictions)
  app.get("/api/proxy-image", async (req, res) => {
    try {
      const rawUrl = req.query.url;
      if (!rawUrl || typeof rawUrl !== "string") {
        return res.status(400).send("url parameter is required");
      }

      let targetUrl = decodeURIComponent(rawUrl.trim());
      if (targetUrl.startsWith("//")) {
        targetUrl = `https:${targetUrl}`;
      }

      try {
        new URL(targetUrl);
      } catch {
        return res.status(400).send("Invalid URL");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 CelebVault/2.0 (https://ais-dev-celebvault; public-domain-display)",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Referer": "https://en.wikipedia.org/",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return res.status(response.status).send(`Upstream error: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "image/jpeg";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=604800, immutable"); // Cache 7 days

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err: any) {
      res.status(500).send("Image proxy failed");
    }
  });

  // 3. Global Directory & Search Endpoint (Search-first with pagination and facets)
  app.get("/api/celebrities", (req, res) => {
    const { search, category, industry, country, sort, page, limit, format } = req.query;

    if (format === "all" || (!search && !category && !industry && !country && !page && !limit && format !== "directory")) {
      return res.json(celebrityStorage.getAll());
    }

    const directory = celebrityStorage.searchDirectory({
      search: typeof search === "string" ? search : undefined,
      category: typeof category === "string" ? category : undefined,
      industry: typeof industry === "string" ? industry : undefined,
      country: typeof country === "string" ? country : undefined,
      sort: typeof sort === "string" ? (sort as any) : "trending",
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 12,
    });

    res.json(directory);
  });

  // Dedicated directory endpoint
  app.get("/api/directory", (req, res) => {
    const { search, category, industry, country, sort, page, limit } = req.query;

    const directory = celebrityStorage.searchDirectory({
      search: typeof search === "string" ? search : undefined,
      category: typeof category === "string" ? category : undefined,
      industry: typeof industry === "string" ? industry : undefined,
      country: typeof country === "string" ? country : undefined,
      sort: typeof sort === "string" ? (sort as any) : "trending",
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 12,
    });

    res.json(directory);
  });

  // 4. Single Celebrity Profile Endpoint
  app.get("/api/celebrities/:id", async (req, res) => {
    const celeb = celebrityStorage.getById(req.params.id);
    if (!celeb) {
      return res.status(404).json({ error: "Celebrity profile not found in index" });
    }

    // If celebrity has no latest news, fetch live news asynchronously in background
    if (!celeb.latestNews || celeb.latestNews.length === 0) {
      fetchLiveNews(celeb.knownAs)
        .then((news) => {
          if (news.length > 0) {
            celebrityStorage.updateNews(celeb.id, news);
          }
        })
        .catch(() => {});
    }

    res.json(celeb);
  });

  // 5. Global Discovery & Live External Source Ingestion Endpoint
  app.post("/api/celebrities/discover", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Search query required" });
      }

      const cleanQuery = query.trim();

      // Step 1: Check existing local persistent index first
      const existing = celebrityStorage.findMatchingLocal(cleanQuery);
      if (existing) {
        return res.json({ celebrity: existing, source: "index_cache", isNew: false });
      }

      // Step 2: Query External Sources (Wikipedia + Wikidata + Live News)
      console.log(`[CelebVault Discovery] Searching external sources for: "${cleanQuery}"`);
      const wikiData = await fetchWikipediaData(cleanQuery);

      if (!wikiData.found || !wikiData.title) {
        return res.status(404).json({
          error: `Public figure "${cleanQuery}" not found in global verified archives. Please verify spelling or try another notable figure.`,
        });
      }

      // Step 3: Check if resolved Wikipedia title matches an already indexed celebrity
      const existingByWiki = celebrityStorage.findMatchingLocal(wikiData.title);
      if (existingByWiki) {
        return res.json({ celebrity: existingByWiki, source: "index_cache", isNew: false });
      }

      // Step 4: Fetch Wikidata Claims & Live News RSS
      const [wikidataClaims, liveNews] = await Promise.all([
        wikiData.wikidataId ? fetchWikidataClaims(wikiData.wikidataId) : Promise.resolve({}),
        fetchLiveNews(wikiData.title),
      ]);

      // Step 5: Normalize and build structured factual profile
      const apiKey = process.env.GEMINI_API_KEY;
      const normalizedCeleb = await normalizeCelebrityFromSources(
        cleanQuery,
        wikiData,
        wikidataClaims,
        liveNews,
        apiKey
      );

      // Step 6: Save to persistent database
      const saved = celebrityStorage.saveCelebrity(normalizedCeleb);

      return res.json({
        celebrity: saved,
        source: "external_discovery",
        isNew: true,
        totalIndexed: celebrityStorage.getCount(),
      });
    } catch (err: any) {
      console.error("[CelebVault Discovery Error]:", err);
      return res.status(500).json({ error: "Failed to discover celebrity from external sources." });
    }
  });

  // Alias for backward compatibility with frontend calls
  app.post("/api/celebrities/generate", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Search query required" });
      }

      const cleanQuery = query.trim();
      const existing = celebrityStorage.findMatchingLocal(cleanQuery);
      if (existing) {
        return res.json({ celebrity: existing, source: "index_cache", isNew: false });
      }

      const wikiData = await fetchWikipediaData(cleanQuery);
      if (!wikiData.found || !wikiData.title) {
        return res.status(404).json({
          error: `Public figure "${cleanQuery}" not found in global verified archives.`,
        });
      }

      const existingByWiki = celebrityStorage.findMatchingLocal(wikiData.title);
      if (existingByWiki) {
        return res.json({ celebrity: existingByWiki, source: "index_cache", isNew: false });
      }

      const [wikidataClaims, liveNews] = await Promise.all([
        wikiData.wikidataId ? fetchWikidataClaims(wikiData.wikidataId) : Promise.resolve({}),
        fetchLiveNews(wikiData.title),
      ]);

      const apiKey = process.env.GEMINI_API_KEY;
      const normalizedCeleb = await normalizeCelebrityFromSources(
        cleanQuery,
        wikiData,
        wikidataClaims,
        liveNews,
        apiKey
      );

      const saved = celebrityStorage.saveCelebrity(normalizedCeleb);
      return res.json({ celebrity: saved, source: "external_discovery", isNew: true });
    } catch (err: any) {
      console.error("Discovery error:", err);
      return res.status(500).json({ error: "Failed to discover celebrity profile." });
    }
  });

  // 6. Incremental Profile Refresh Endpoint (Compares latest sources and updates only changed fields)
  app.post("/api/celebrities/:id/refresh", async (req, res) => {
    try {
      const celebId = req.params.id;
      const existing = celebrityStorage.getById(celebId);
      if (!existing) {
        return res.status(404).json({ error: "Celebrity profile not found" });
      }

      // Fetch fresh external source data
      const searchTarget = existing.externalIdentity?.wikipediaTitle || existing.knownAs;
      const [wikiData, liveNews] = await Promise.all([
        fetchWikipediaData(searchTarget),
        fetchLiveNews(existing.knownAs),
      ]);

      let wikidataClaims = {};
      const wikidataId = wikiData.wikidataId || existing.externalIdentity?.wikidataId;
      if (wikidataId) {
        wikidataClaims = await fetchWikidataClaims(wikidataId);
      }

      // Update news articles
      if (liveNews.length > 0) {
        celebrityStorage.updateNews(celebId, liveNews);
      }

      // Update biographical facts if changed
      const updates: Partial<Celebrity> = {
        lastRefreshedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (wikiData.originalImageUrl && wikiData.originalImageUrl !== existing.bestViewPhoto) {
        updates.bestViewPhoto = wikiData.originalImageUrl;
      }

      if (liveNews.length > 0) {
        updates.latestNews = liveNews;
      }

      const updated = celebrityStorage.updateCelebrity(celebId, updates);
      return res.json({ celebrity: updated, updated: true, refreshedAt: updates.lastRefreshedAt });
    } catch (err: any) {
      console.error("Refresh error:", err);
      return res.status(500).json({ error: "Failed to refresh profile from external sources." });
    }
  });

  // 7. Live News Endpoint
  app.get("/api/celebrities/:id/news", async (req, res) => {
    try {
      const celeb = celebrityStorage.getById(req.params.id);
      if (!celeb) {
        return res.status(404).json({ error: "Celebrity not found" });
      }

      const news = await fetchLiveNews(celeb.knownAs);
      if (news.length > 0) {
        celebrityStorage.updateNews(celeb.id, news);
      }

      res.json({ articles: news, celebrity: celeb.knownAs });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve live news." });
    }
  });

  // 8. AI Pitch Generator Endpoint
  app.post("/api/ai/pitch", async (req, res) => {
    try {
      const { celebrityName, inquiryType, eventDetails, companyName } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const fallbackPitch =
        `Dear Talent Management Team for ${celebrityName},\n\n` +
        `On behalf of ${companyName || "our organization"}, we are submitting a formal talent representation inquiry regarding a ${inquiryType || "collaboration"} opportunity.\n\n` +
        `Project Scope: ${eventDetails || "We are preparing a premier engagement and would appreciate reviewing availability and compensation frameworks."}\n\n` +
        `We look forward to connecting with your representation desk at your earliest convenience.\n\n` +
        `Sincerely,\n${companyName || "Client Representation Team"}`;

      if (!apiKey) {
        return res.json({ pitch: fallbackPitch });
      }

      const prompt = `Write a polished, highly professional talent booking & collaboration pitch letter addressed to the official talent management desk for celebrity ${celebrityName}.
Engagement Type: ${inquiryType || "Brand Endorsement / Speaking Engagement"}.
Client Organization: ${companyName || "Executive Client"}.
Project Details: ${eventDetails || "Exclusive premier engagement."}

Tone: Courteous, respectful, clear, business-ready. Max 200 words.`;

      const text = await generateContentWithFallback(prompt, apiKey);
      res.json({ pitch: text || fallbackPitch });
    } catch (err: any) {
      console.error("Gemini Pitch Error:", err);
      res.status(500).json({ error: "Failed to generate AI pitch letter." });
    }
  });

  // 9. AI Celebrity Q&A Trivia Endpoint (Grounded in factual knowledge)
  app.post("/api/ai/ask", async (req, res) => {
    try {
      const { celebrityId, question } = req.body;
      const celeb = celebrityStorage.getById(celebrityId);
      const celebName = celeb ? celeb.fullName : "this public figure";

      const apiKey = process.env.GEMINI_API_KEY;
      const fallbackAnswer = `Here is factual information regarding ${celebName}: ${celeb?.biography.summary || "An internationally recognized public figure."}`;

      if (!apiKey) {
        return res.json({ answer: fallbackAnswer });
      }

      const prompt = `You are a verified celebrity knowledge assistant. Answer the user's question about ${celebName} factually and accurately using verified records.
Do NOT invent facts.

Celebrity Context:
Name: ${celebName}
Industry: ${celeb?.industry}
Country: ${celeb?.country}
DOB: ${celeb?.birthDetails.dateOfBirth}
Key Achievements / Works: ${celeb?.films.map((f) => f.movieName).join(", ") || "Renowned career milestones"}
Major Awards: ${celeb?.awards.map((a) => a.awardName).join(", ") || "Recognized achievements"}

Question: ${question}

Provide a concise, accurate response (max 150 words).`;

      const text = await generateContentWithFallback(prompt, apiKey);
      res.json({ answer: text || fallbackAnswer });
    } catch (err: any) {
      console.error("Gemini Ask Error:", err);
      res.status(500).json({ error: "Could not answer question at this time." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
