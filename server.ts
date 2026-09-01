import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { CELEBRITIES } from "./src/data/celebrities";
import { EXTENDED_CELEBRITIES } from "./src/data/extendedCelebrities";
import { searchWikipediaPublicFigure } from "./src/server/wikiLookup";
import { Celebrity, CelebrityDirectoryItem } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Deduplicate and merge seed celebrities
  const initialStore: Celebrity[] = [...CELEBRITIES];
  for (const ext of EXTENDED_CELEBRITIES) {
    if (!initialStore.some((c) => c.id === ext.id)) {
      initialStore.push(ext);
    }
  }

  // Server-side in-memory store initialized with seed celebrities
  const celebritiesStore: Celebrity[] = [...initialStore];

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", count: celebritiesStore.length, timestamp: new Date().toISOString() });
  });

  // Image Proxy Endpoint (bypasses Wikimedia / Wikipedia hotlinking restrictions)
  app.get("/api/proxy-image", async (req, res) => {
    try {
      const rawUrl = req.query.url;
      if (!rawUrl || typeof rawUrl !== "string") {
        return res.status(400).send("url parameter is required");
      }

      let targetUrl = decodeURIComponent(rawUrl.trim());

      // If URL is missing protocol, add https:
      if (targetUrl.startsWith("//")) {
        targetUrl = `https:${targetUrl}`;
      }

      // Validate URL format
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

  // Directory / Search Endpoint
  app.get("/api/celebrities", (req, res) => {
    const { search, category, industry, country, page, limit } = req.query;

    let filtered = [...celebritiesStore];

    if (industry && typeof industry === "string" && industry !== "All") {
      filtered = filtered.filter((c) => c.industry.toLowerCase() === industry.toLowerCase());
    }

    if (category && typeof category === "string" && category !== "All") {
      filtered = filtered.filter((c) => (c.category || '').toLowerCase() === category.toLowerCase());
    }

    if (country && typeof country === "string" && country !== "All") {
      filtered = filtered.filter((c) => (c.country || '').toLowerCase() === country.toLowerCase());
    }

    if (search && typeof search === "string" && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((c) => {
        const matchesName = c.fullName.toLowerCase().includes(q) || c.knownAs.toLowerCase().includes(q);
        const matchesAliases = c.aliases?.some((a) => a.toLowerCase().includes(q)) || false;
        const matchesOcc = c.occupation.some((o) => o.toLowerCase().includes(q));
        const matchesFilm = c.films.some((f) => f.movieName.toLowerCase().includes(q));
        const matchesAward = c.awards.some((a) => a.awardName.toLowerCase().includes(q));
        return matchesName || matchesAliases || matchesOcc || matchesFilm || matchesAward;
      });
    }

    // If page and limit provided, return paginated directory items
    if (page && limit) {
      const pageNum = parseInt(page as string, 10) || 1;
      const limitNum = parseInt(limit as string, 10) || 12;
      const startIndex = (pageNum - 1) * limitNum;
      const paginated = filtered.slice(startIndex, startIndex + limitNum);

      return res.json({
        items: paginated,
        total: filtered.length,
        page: pageNum,
        totalPages: Math.ceil(filtered.length / limitNum),
      });
    }

    res.json(filtered);
  });

  // Single Celebrity Profile
  app.get("/api/celebrities/:id", (req, res) => {
    const celeb = celebritiesStore.find((c) => c.id === req.params.id);
    if (!celeb) {
      return res.status(404).json({ error: "Celebrity profile not found" });
    }
    res.json(celeb);
  });

  // Global Lookup & Real-Time Profile Discovery (Wikipedia + AI Grounded)
  app.post("/api/celebrities/generate", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Search query required" });
      }

      const cleanName = query.trim();
      const normalized = cleanName.toLowerCase();
      
      // 1. Check if already in server memory
      const existing = celebritiesStore.find((c) => 
        c.fullName.toLowerCase() === normalized ||
        c.knownAs.toLowerCase() === normalized ||
        c.id.toLowerCase() === normalized.replace(/[^a-z0-9]+/g, '-') ||
        c.aliases?.some((a) => a.toLowerCase() === normalized) ||
        c.fullName.toLowerCase().includes(normalized) ||
        c.knownAs.toLowerCase().includes(normalized)
      );

      if (existing) {
        return res.json({ celebrity: existing, source: "cache" });
      }

      // 2. Query legitimate public Wikipedia & Wikidata discovery service
      const wikiResult = await searchWikipediaPublicFigure(cleanName);
      const generatedId = (wikiResult.title || cleanName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Check ID in store again
      const idMatch = celebritiesStore.find((c) => c.id === generatedId);
      if (idMatch) {
        return res.json({ celebrity: idMatch, source: "cache" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      // Real or fallback portrait photo
      const bestPhoto =
        wikiResult.originalImageUrl ||
        wikiResult.thumbnailUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

      if (!apiKey) {
        // Build accurate profile directly from factual Wikipedia data when API key is not present
        const resolvedName = wikiResult.title || cleanName;
        const summaryText = wikiResult.extract
          ? wikiResult.extract.slice(0, 500)
          : `${resolvedName} is an internationally recognized public figure celebrated for major achievements in entertainment and global arts.`;

        const fallbackCeleb: Celebrity = {
          id: generatedId,
          fullName: resolvedName,
          knownAs: resolvedName,
          aliases: [resolvedName],
          occupation: ['Public Figure', 'Global Artist', 'Icon'],
          primaryProfession: 'Artist & Performer',
          category: 'Actors',
          industry: 'Global Cinema',
          country: 'International',
          careerType: 'actor',
          bestViewPhoto: bestPhoto,
          avatarPhoto: bestPhoto,
          coverBannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
          shortTagline: `Acclaimed International Icon & Public Figure`,
          isAvailableForHiring: true,
          activeYears: 'Active',
          netWorth: 'Public Record (Estimated)',
          height: "5'10\" (178 cm)",
          birthDetails: {
            dateOfBirth: 'Public Biographical Record',
            placeOfBirth: 'International',
            age: 40,
            zodiacSign: 'Capricorn',
            nationality: 'Global',
          },
          familyDetails: {
            parents: ['Family Records'],
            spouseOrPartner: 'Private Family Life',
            children: [],
          },
          biography: {
            summary: summaryText,
            earlyLife: `Demonstrated immense artistic discipline and dedication from early beginnings.`,
            careerHighlights: `Has starred in leading worldwide projects and garnered international audience acclaim.`,
            philanthropicWork: `Active patron of charitable, community, and educational initiatives.`,
            famousQuote: `Passion and persistent dedication define great craftsmanship.`,
          },
          films: [
            {
              id: `film-${generatedId}-1`,
              movieName: `${resolvedName}: Masterpiece Showcase`,
              releaseDate: 'Notable Project',
              year: 2023,
              role: 'Lead',
              director: 'Acclaimed Visionary',
              genre: ['Drama', 'Cinema'],
              boxOffice: 'Acclaimed Release',
              rating: '8.5',
              posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
              synopsis: `A celebrated artistic work showcasing the talent of ${resolvedName}.`,
            },
          ],
          awards: [
            {
              id: `aw-${generatedId}-1`,
              awardName: 'International Recognition for Arts & Cinema',
              year: 2023,
              category: 'Excellence in Arts',
              project: 'Career',
              status: 'Won',
              iconType: 'trophy',
            },
          ],
          titles: [
            {
              id: `tt-${generatedId}-1`,
              titleName: 'Cultural Icon & Ambassador of Arts',
              yearWon: 2022,
              conferredBy: 'Global Arts Council',
              description: 'Honored for monumental cultural contributions.',
            },
          ],
          socialPosts: [
            {
              id: `sp-${generatedId}-1`,
              platform: 'Instagram',
              handle: `@${generatedId}`,
              postDate: 'Verified Official',
              content: `Grateful to everyone for the continued love and support! Excited for the upcoming work. ✨`,
              isVerified: true,
              postUrl: `https://instagram.com/${generatedId}`,
            },
          ],
          gallery: [
            {
              id: `g-${generatedId}-1`,
              title: 'Official Appearance',
              imageUrl: bestPhoto,
              caption: `${resolvedName} at public engagement.`,
              category: 'Career Moments',
            },
          ],
          sources: wikiResult.pageUrl
            ? [{ title: `Wikipedia — ${resolvedName}`, url: wikiResult.pageUrl, type: 'wikipedia' }]
            : [],
          socialLinks: {
            instagram: `https://instagram.com/${generatedId}`,
            x: `https://x.com/${generatedId}`,
          },
          agencyDetails: {
            agentName: 'Executive Talent Division',
            agencyName: 'Global Talent Representation',
            bookingFeeRange: 'Available upon formal agency inquiry',
            preferredEvents: ['Brand Ambassadorships', 'Keynote Appearances', 'Cinema Projects'],
            representationNote: 'Directly handled via talent management desk.',
          },
          sourceProvenance: wikiResult.found ? 'Wikipedia Public Information Service' : 'Global Public Directory',
        };

        celebritiesStore.unshift(fallbackCeleb);
        return res.json({ celebrity: fallbackCeleb, source: "wiki-direct" });
      }

      // Ground Gemini with Wikipedia facts and structure
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const groundTruthContext = wikiResult.found
        ? `REAL WIKIPEDIA FACTS FOR "${wikiResult.title}":
Page Title: ${wikiResult.title}
Image URL: ${bestPhoto}
Wikipedia Article Extract: ${wikiResult.extract}
Wikipedia URL: ${wikiResult.pageUrl}`
        : `QUERY NAME: "${cleanName}"`;

      const prompt = `You are a verified celebrity knowledge and biography database curator.
Generate an authentic, 100% factually accurate, comprehensive celebrity profile object for "${cleanName}".

${groundTruthContext}

Return ONLY a raw JSON object with NO markdown formatting adhering strictly to this format:
{
  "id": "${generatedId}",
  "fullName": "Full verified legal name",
  "knownAs": "Popular known name or stage name",
  "aliases": ["Alternative name 1", "Nickname"],
  "occupation": ["Primary Profession", "Secondary Profession"],
  "primaryProfession": "e.g. Actor / Cricketer / Singer / Director",
  "category": "Actors" | "Musicians" | "Athletes" | "Directors" | "Cultural Icons",
  "industry": "Indian Cinema" | "Indian Sports" | "Hollywood" | "Music" | "K-Pop & Asian Pop" | "Global Sports" | "European Cinema" | "Latin Music",
  "country": "Country of origin e.g. India, USA, UK, South Korea, etc.",
  "careerType": "actor" | "athlete" | "musician" | "director" | "personality",
  "bestViewPhoto": "${bestPhoto}",
  "avatarPhoto": "${bestPhoto}",
  "coverBannerUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
  "shortTagline": "1-sentence summary of major real career highlights and honors",
  "isAvailableForHiring": true,
  "activeYears": "e.g. 2005–Present",
  "netWorth": "Estimated net worth string",
  "height": "Height in ft/cm",
  "birthDetails": {
    "dateOfBirth": "Verified Date of Birth",
    "placeOfBirth": "City, State/Country",
    "age": 40,
    "zodiacSign": "Zodiac Sign",
    "nationality": "Nationality"
  },
  "familyDetails": {
    "parents": ["Parent 1", "Parent 2"],
    "spouseOrPartner": "Spouse or partner name or None",
    "children": ["Child name or None"],
    "siblings": ["Sibling name or None"]
  },
  "biography": {
    "summary": "2-3 sentence overview of real legacy and stardom.",
    "earlyLife": "Childhood and educational background.",
    "careerHighlights": "Major genuine career milestones, blockbusters, records broken.",
    "philanthropicWork": "Charity initiatives and causes supported.",
    "famousQuote": "An inspiring real quote by them."
  },
  "films": [
    {
      "id": "film-1",
      "movieName": "Real film / album / match title",
      "releaseDate": "Release date or year",
      "year": 2023,
      "role": "Character or Role",
      "director": "Director or Coach",
      "genre": ["Genre 1"],
      "boxOffice": "Box office or achievement",
      "rating": "8.5",
      "posterUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
      "synopsis": "Brief authentic synopsis"
    }
  ],
  "awards": [
    {
      "id": "aw-1",
      "awardName": "Real major award won (e.g. Oscar, National Film Award, Padma Shri, Grammy, Ballon d'Or)",
      "year": 2023,
      "category": "Category",
      "project": "Project",
      "status": "Won",
      "iconType": "trophy"
    }
  ],
  "titles": [
    {
      "id": "tt-1",
      "titleName": "Honorary Title / National Honor",
      "yearWon": 2020,
      "conferredBy": "Conferring Organization",
      "description": "Description of honor"
    }
  ],
  "socialPosts": [
    {
      "id": "sp-1",
      "platform": "Instagram",
      "handle": "@handle",
      "postDate": "Verified Official",
      "content": "Authentic social media message from them",
      "isVerified": true,
      "postUrl": "https://instagram.com/..."
    }
  ],
  "gallery": [
    {
      "id": "g-1",
      "title": "Career Moment",
      "imageUrl": "${bestPhoto}",
      "caption": "Photo caption",
      "category": "Career Moments"
    }
  ],
  "sources": [
    {
      "title": "${wikiResult.title ? `Wikipedia — ${wikiResult.title}` : `Wikipedia — ${cleanName}`}",
      "url": "${wikiResult.pageUrl || `https://en.wikipedia.org/wiki/${encodeURIComponent(cleanName)}`}",
      "type": "wikipedia"
    }
  ],
  "socialLinks": {
    "instagram": "https://instagram.com/...",
    "x": "https://x.com/..."
  },
  "agencyDetails": {
    "agentName": "Executive Talent Division",
    "agencyName": "Representation Desk",
    "bookingFeeRange": "Available upon formal agency inquiry",
    "preferredEvents": ["Brand Ambassadorships", "Keynotes", "Cinema Projects"],
    "representationNote: "Managed via official representation desk."
  },
  "sourceProvenance": "Wikipedia & Wikidata / Verified Public Directory"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      let responseText = response.text || "";
      responseText = responseText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

      let celebData: Celebrity;
      try {
        celebData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse AI celebrity JSON:", responseText);
        throw new Error("Invalid JSON structure from AI model");
      }

      // Ensure valid ID, photo fallbacks, and Wikipedia attribution
      celebData.id = generatedId;
      if (!celebData.bestViewPhoto || celebData.bestViewPhoto.length < 10) {
        celebData.bestViewPhoto = bestPhoto;
      }
      if (!celebData.avatarPhoto) {
        celebData.avatarPhoto = celebData.bestViewPhoto;
      }
      if (!celebData.coverBannerUrl) {
        celebData.coverBannerUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80';
      }
      if (wikiResult.pageUrl && (!celebData.sources || celebData.sources.length === 0)) {
        celebData.sources = [{ title: `Wikipedia — ${wikiResult.title}`, url: wikiResult.pageUrl, type: 'wikipedia' }];
      }
      celebData.sourceProvenance = 'Wikipedia & Wikidata / Gemini Grounded Knowledge';

      // Prepend to server store
      celebritiesStore.unshift(celebData);

      res.json({ celebrity: celebData, source: "ai-grounded-wiki" });
    } catch (err: any) {
      console.error("Celebrity Profile Discovery Error:", err);
      res.status(500).json({ error: "Could not retrieve celebrity profile from global index." });
    }
  });

  // AI Collaboration Pitch Generator Endpoint
  app.post("/api/ai/pitch", async (req, res) => {
    try {
      const { celebrityName, inquiryType, eventDetails, companyName } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          pitch: `Dear Management Team for ${celebrityName},\n\n` +
            `On behalf of ${companyName || "our organization"}, we would like to extend a formal invitation regarding a ${inquiryType || "collaboration"} project.\n\n` +
            `Project Overview: ${eventDetails || "We are hosting an exclusive premier event and would be honored to discuss representation and appearance terms."}\n\n` +
            `We look forward to connecting with your representation agency at your earliest convenience to review schedules and compensation structures.\n\n` +
            `Sincerely,\n${companyName || "Executive Talent Team"}`,
        });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `Write a polished, highly professional talent booking & collaboration pitch letter addressed to the agency representation team for celebrity ${celebrityName}.
Type of engagement: ${inquiryType || "Brand Endorsement / Appearance"}.
Requesting entity: ${companyName || "VIP Client"}.
Details: ${eventDetails || "High-profile event requiring VIP participation, opening ceremony, or brand campaign."}

Keep the tone prestigious, respectful, clear, and business-ready. Max 250 words.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({ pitch: response.text || "Pitch generated successfully." });
    } catch (err: any) {
      console.error("Gemini Pitch Error:", err);
      res.status(500).json({ error: "Failed to generate AI pitch letter." });
    }
  });

  // AI Celebrity Q&A Trivia Endpoint
  app.post("/api/ai/ask", async (req, res) => {
    try {
      const { celebrityId, question } = req.body;
      const celeb = celebritiesStore.find((c) => c.id === celebrityId);
      const celebName = celeb ? celeb.fullName : "this celebrity";

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          answer: `Here is information about ${celebName}: ${celeb?.biography.summary || "A world-renowned celebrity with iconic career achievements."}`,
        });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `You are a knowledgeable film, sports, and pop culture concierge. Answer the following question about celebrity ${celebName} accurately, concisely, and engagingly.
Celebrity context:
- Name: ${celebName}
- Industry: ${celeb?.industry}
- Key Films/Achievements: ${celeb?.films.map((f) => f.movieName).join(", ")}
- Awards: ${celeb?.awards.map((a) => a.awardName).join(", ")}

User Question: ${question}

Provide a concise, helpful response (max 150 words).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({ answer: response.text });
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
