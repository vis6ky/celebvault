import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { CELEBRITIES } from "./src/data/celebrities.js";
import { Celebrity } from "./src/types.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Server-side in-memory store initialized with seed celebrities
  const celebritiesStore: Celebrity[] = [...CELEBRITIES];

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", count: celebritiesStore.length, timestamp: new Date().toISOString() });
  });

  app.get("/api/celebrities", (req, res) => {
    res.json(celebritiesStore);
  });

  app.get("/api/celebrities/:id", (req, res) => {
    const celeb = celebritiesStore.find((c) => c.id === req.params.id);
    if (!celeb) {
      return res.status(404).json({ error: "Celebrity profile not found" });
    }
    res.json(celeb);
  });

  // Dynamic AI Celebrity Profile Generator for Any Global Celebrity
  app.post("/api/celebrities/generate", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Search query required" });
      }

      const normalized = query.trim().toLowerCase();
      
      // Check if already in server memory
      const existing = celebritiesStore.find((c) => 
        c.fullName.toLowerCase().includes(normalized) ||
        c.knownAs.toLowerCase().includes(normalized) ||
        c.id.toLowerCase() === normalized.replace(/\s+/g, '-')
      );

      if (existing) {
        return res.json({ celebrity: existing, source: "cache" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const cleanName = query.trim();
      const generatedId = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      if (!apiKey) {
        // High quality fallback profile when API key is missing
        const fallbackCeleb: Celebrity = {
          id: generatedId,
          fullName: cleanName,
          knownAs: cleanName,
          occupation: ['Global Celebrity', 'Public Figure', 'Icon'],
          industry: 'Global Cinema',
          bestViewPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          avatarPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          coverBannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
          shortTagline: `Acclaimed International Public Figure & Award-Winning Artist`,
          isAvailableForHiring: true,
          activeYears: '2005–Present',
          netWorth: '$50 Million',
          height: "5'10\" (178 cm)",
          birthDetails: {
            dateOfBirth: 'January 1, 1985',
            placeOfBirth: 'International',
            age: 41,
            zodiacSign: 'Capricorn',
            nationality: 'Global',
          },
          familyDetails: {
            parents: ['Prominent Family'],
            spouseOrPartner: 'Private Family Life',
            children: [],
          },
          biography: {
            summary: `${cleanName} is a celebrated worldwide icon known for groundbreaking career accomplishments, millions of dedicated fans, and major contributions to global culture.`,
            earlyLife: `Demonstrated immense talent and dedication early in life, ascending rapidly through industry ranks.`,
            careerHighlights: `Has starred in blockbuster projects, topped international charts, and received prestigious industry recognitions.`,
            philanthropicWork: `Active supporter of global humanitarian, environmental, and educational causes.`,
            famousQuote: `Excellence is not an accident; it is a commitment to passion every single day.`,
          },
          films: [
            {
              id: `film-${generatedId}-1`,
              movieName: `${cleanName}: The Global Journey`,
              releaseDate: '2023',
              year: 2023,
              role: 'Lead',
              director: 'Acclaimed Visionary',
              genre: ['Drama', 'Biography'],
              boxOffice: '$100 Million+',
              rating: '8.2',
              posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
              synopsis: `A celebrated masterpiece showcasing the pinnacle performance of ${cleanName}.`,
            }
          ],
          awards: [
            { id: `aw-${generatedId}-1`, awardName: 'Global Achievement Award', year: 2023, category: 'Outstanding Icon', project: 'Career Excellence', status: 'Won', iconType: 'trophy' },
          ],
          titles: [
            { id: `tt-${generatedId}-1`, titleName: 'Cultural Ambassador of Cinema & Arts', yearWon: 2022, conferredBy: 'International Arts Council', description: 'Honored for outstanding global leadership.' }
          ],
          socialPosts: [
            {
              id: `sp-${generatedId}-1`,
              platform: 'Instagram',
              handle: `@${generatedId}`,
              postDate: '1 day ago',
              content: `Extremely grateful for all the support from fans around the world! Big projects ahead. ✨`,
              likesCount: 1500000,
              commentsCount: 25000,
              sharesCount: 45000,
              isVerified: true,
            }
          ],
          gallery: [
            { id: `g-${generatedId}-1`, title: 'Red Carpet Gala', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85', caption: `${cleanName} attending international awards ceremony.`, category: 'Red Carpet' }
          ],
          socialLinks: {
            instagram: `https://instagram.com/${generatedId}`,
            x: `https://x.com/${generatedId}`,
          },
          agencyDetails: {
            agentName: 'Global Talent Representation',
            agencyName: 'International Talent Agency',
            bookingFeeRange: '$300,000 - $1,000,000',
            preferredEvents: ['Brand Endorsements', 'Global Keynotes', 'Gala Appearances'],
          }
        };

        celebritiesStore.unshift(fallbackCeleb);
        return res.json({ celebrity: fallbackCeleb, source: "ai-generated-fallback" });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `Generate an authentic, full, 100% complete biography and career profile object for the celebrity/public figure "${cleanName}".
Return ONLY a raw JSON object with NO markdown formatting around it adhering strictly to this JSON format:

{
  "id": "${generatedId}",
  "fullName": "Full legal name",
  "knownAs": "Famous stage name or nickname",
  "occupation": ["Primary Profession", "Secondary Role"],
  "industry": "Indian Cinema" | "Indian Sports" | "Hollywood" | "Music" | "K-Pop & Asian Pop" | "Global Sports" | "European Cinema" | "Latin Music",
  "bestViewPhoto": "High-res portrait image URL (or fallback unsplash URL)",
  "avatarPhoto": "Avatar portrait image URL",
  "coverBannerUrl": "High-res banner photo URL",
  "shortTagline": "A punchy 1-line tag line summarizing their major achievements",
  "isAvailableForHiring": true,
  "activeYears": "e.g. 2005–Present",
  "netWorth": "Estimated net worth string e.g. $100 Million",
  "height": "Height string e.g. 5'10\\" (178 cm)",
  "birthDetails": {
    "dateOfBirth": "Exact Date of Birth string",
    "placeOfBirth": "City, State/Country",
    "age": 35,
    "zodiacSign": "Zodiac Sign",
    "nationality": "Nationality"
  },
  "familyDetails": {
    "parents": ["Parent 1", "Parent 2"],
    "spouseOrPartner": "Spouse or partner name or None",
    "children": ["Child 1"],
    "siblings": ["Sibling 1"]
  },
  "biography": {
    "summary": "Detailed 2-3 sentence overview of their legacy and global stardom.",
    "earlyLife": "Brief description of childhood and origins.",
    "careerHighlights": "Major career milestones, blockbusters, records broken.",
    "philanthropicWork": "Charity work and social causes supported.",
    "famousQuote": "An inspiring or famous quote by them."
  },
  "films": [
    {
      "id": "film-1",
      "movieName": "Major Movie/Album/Match name",
      "releaseDate": "Release date string",
      "year": 2022,
      "role": "Role played",
      "director": "Director / Coach name",
      "genre": ["Genre 1", "Genre 2"],
      "boxOffice": "Box office gross or achievement string",
      "rating": "8.5",
      "posterUrl": "Poster image URL",
      "synopsis": "Brief plot or achievement summary"
    }
  ],
  "awards": [
    {
      "id": "aw-1",
      "awardName": "Major Award Won (e.g. Padma Shri, Oscar, Filmfare, National Award, Ballon d'Or, Grammy)",
      "year": 2021,
      "category": "Category",
      "project": "Associated project",
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
      "description": "Description of title"
    }
  ],
  "socialPosts": [
    {
      "id": "sp-1",
      "platform": "Instagram",
      "handle": "@handle",
      "postDate": "1 day ago",
      "content": "Authentic style social media message from them",
      "likesCount": 2000000,
      "commentsCount: 45000,
      "sharesCount": 120000,
      "isVerified": true
    }
  ],
  "gallery": [
    {
      "id": "g-1",
      "title": "Red Carpet / Public Event",
      "imageUrl": "Image URL",
      "caption": "Photo caption",
      "category": "Red Carpet"
    }
  ],
  "socialLinks": {
    "instagram": "https://instagram.com/...",
    "x": "https://x.com/..."
  },
  "agencyDetails": {
    "agentName": "Agent / Manager Name",
    "agencyName": "Agency Name",
    "bookingFeeRange": "$500,000 - $1,500,000",
    "preferredEvents": ["Brand Endorsements", "Keynotes", "Private Events"]
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      let responseText = response.text || "";
      // Strip markdown code fences if present
      responseText = responseText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

      let celebData: Celebrity;
      try {
        celebData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse AI celebrity JSON:", responseText);
        throw new Error("Invalid JSON structure from AI model");
      }

      // Ensure valid ID and fallbacks for photos if generic/missing
      celebData.id = generatedId;
      if (!celebData.bestViewPhoto || celebData.bestViewPhoto.length < 10) {
        celebData.bestViewPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
      }
      if (!celebData.avatarPhoto) {
        celebData.avatarPhoto = celebData.bestViewPhoto;
      }
      if (!celebData.coverBannerUrl) {
        celebData.coverBannerUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80';
      }

      // Prepend to store
      celebritiesStore.unshift(celebData);

      res.json({ celebrity: celebData, source: "ai-generated" });
    } catch (err: any) {
      console.error("Gemini Celebrity Generation Error:", err);
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

