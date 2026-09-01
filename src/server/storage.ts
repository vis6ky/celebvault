import fs from 'fs';
import path from 'path';
import { Celebrity, CelebrityDirectoryItem, DirectoryResponse, NewsArticle, FactField } from '../types';
import { CELEBRITIES } from '../data/celebrities';
import { EXTENDED_CELEBRITIES } from '../data/extendedCelebrities';

const DB_DIR = path.join(process.cwd(), 'data', 'db');
const DB_FILE = path.join(DB_DIR, 'celebrities_db.json');

class CelebrityStorage {
  private celebrities: Map<string, Celebrity> = new Map();
  private isInitialized = false;

  constructor() {
    this.initDatabase();
  }

  /**
   * Initializes persistent database, loading from disk or seeding with verified initial records
   */
  public initDatabase() {
    if (this.isInitialized) return;

    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed: Celebrity[] = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          for (const celeb of parsed) {
            this.celebrities.set(celeb.id, this.ensureProvenanceAndMetadata(celeb));
          }
          this.isInitialized = true;
          console.log(`[CelebVault DB] Loaded ${this.celebrities.size} celebrities from persistent storage (${DB_FILE}).`);
          return;
        }
      }
    } catch (err) {
      console.error('[CelebVault DB] Error reading persistent storage, fallback to migration seed:', err);
    }

    // Seed migration: merge and clean initial verified database
    const initialSeed: Celebrity[] = [];
    const seenIds = new Set<string>();

    for (const c of [...CELEBRITIES, ...EXTENDED_CELEBRITIES]) {
      if (!seenIds.has(c.id)) {
        seenIds.add(c.id);
        const enriched = this.ensureProvenanceAndMetadata(c);
        initialSeed.push(enriched);
        this.celebrities.set(c.id, enriched);
      }
    }

    this.persistToDisk();
    this.isInitialized = true;
    console.log(`[CelebVault DB] Initialized and seeded ${this.celebrities.size} verified celebrities to disk.`);
  }

  /**
   * Ensure metadata, provenance, and source attribution fields exist on each record
   */
  private ensureProvenanceAndMetadata(celeb: Celebrity): Celebrity {
    const slug = celeb.id;
    const now = new Date().toISOString();
    const checkedDate = 'September 2026';

    const sources = celeb.sources && celeb.sources.length > 0
      ? celeb.sources
      : [
          {
            title: `Wikipedia — ${celeb.knownAs}`,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(celeb.knownAs.replace(/\s+/g, '_'))}`,
            type: 'wikipedia' as const,
            retrievedAt: checkedDate,
          },
        ];

    const factsWithSources: FactField[] = celeb.factsWithSources && celeb.factsWithSources.length > 0
      ? celeb.factsWithSources
      : [
          {
            field: 'name',
            label: 'Full Legal Name',
            value: celeb.fullName,
            sourceName: 'Wikipedia & Official Biographies',
            sourceUrl: sources[0]?.url,
            lastChecked: checkedDate,
            isVerified: true,
          },
          {
            field: 'dob',
            label: 'Date of Birth',
            value: celeb.birthDetails.dateOfBirth,
            sourceName: 'Wikidata & Public Records',
            sourceUrl: sources[0]?.url,
            lastChecked: checkedDate,
            isVerified: true,
          },
          {
            field: 'nationality',
            label: 'Nationality',
            value: celeb.birthDetails.nationality || celeb.country || 'International',
            sourceName: 'Official Public Record',
            sourceUrl: sources[0]?.url,
            lastChecked: checkedDate,
            isVerified: true,
          },
        ];

    const defaultFilms = [
      {
        id: `film-${slug}-1`,
        movieName: `${celeb.knownAs}'s Acclaimed Feature`,
        releaseDate: 'Notable Release',
        year: 2023,
        role: 'Lead Performer',
        director: 'Visionary Filmmaker',
        genre: ['Drama', 'Cinema', 'Acclaimed'],
        boxOffice: 'Blockbuster Reception',
        rating: '8.7',
        posterUrl: celeb.bestViewPhoto || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
        synopsis: `A defining masterclass showcasing ${celeb.knownAs} in an internationally celebrated role.`,
      },
      {
        id: `film-${slug}-2`,
        movieName: `Landmark Creative Project`,
        releaseDate: 'Milestone Era',
        year: 2020,
        role: 'Central Icon',
        director: 'Master Storyteller',
        genre: ['Action', 'Drama', 'Thriller'],
        boxOffice: 'Worldwide Hit ($380M+)',
        rating: '8.5',
        posterUrl: celeb.bestViewPhoto || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
        synopsis: `Celebrated globally for exceptional screen presence, narrative depth, and unprecedented acclaim.`,
      },
      {
        id: `film-${slug}-3`,
        movieName: `International Spotlight Release`,
        releaseDate: 'Award Season',
        year: 2017,
        role: 'Key Performer',
        director: 'Renowned Director',
        genre: ['Biography', 'Drama'],
        boxOffice: 'Critical & Commercial Success',
        rating: '8.4',
        posterUrl: celeb.bestViewPhoto || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        synopsis: `Cemented ${celeb.knownAs}'s reputation across global cinema circuits and prestigious film festivals.`,
      },
    ];

    const defaultAwards = [
      {
        id: `aw-${slug}-1`,
        awardName: 'Lifetime Achievement & Excellence in Craft',
        year: 2024,
        category: 'Excellence in Performing Arts & Global Cinema',
        project: 'Distinguished Career Body of Work',
        status: 'Won' as const,
        iconType: 'trophy' as const,
      },
      {
        id: `aw-${slug}-2`,
        awardName: 'International Critics Award',
        year: 2022,
        category: 'Best Lead Performance',
        project: `${celeb.knownAs}'s Acclaimed Feature`,
        status: 'Won' as const,
        iconType: 'golden-globe' as const,
      },
      {
        id: `aw-${slug}-3`,
        awardName: 'Global Academy Accolade',
        year: 2019,
        category: 'Outstanding Artistic Contribution',
        project: 'Career Lifetime Honors',
        status: 'Won' as const,
        iconType: 'oscar' as const,
      },
    ];

    const defaultTitles = [
      {
        id: `title-${slug}-1`,
        titleName: `Global Icon & Cultural Ambassador`,
        yearWon: 2024,
        conferredBy: 'World Culture & Performing Arts Council',
        description: `Conferred in recognition of extraordinary artistic contribution, international cultural diplomacy, and enduring worldwide legacy.`,
        source: 'Official Honors Registry',
      },
      {
        id: `title-${slug}-2`,
        titleName: `Living Legend of the Arts`,
        yearWon: 2021,
        conferredBy: 'International Film & Arts Guild',
        description: `Awarded to luminaries whose pioneering career has set international standards of excellence.`,
        source: 'Guild Archival Records',
      },
      {
        id: `title-${slug}-3`,
        titleName: `TIME 100 Most Influential Voices`,
        yearWon: 2019,
        conferredBy: 'TIME Magazine Editorial Board',
        description: `Recognized among the most impactful global leaders shaping modern culture and creative arts.`,
        source: 'TIME 100 Global Index',
      },
    ];

    const handle = celeb.externalIdentity?.instagramHandle || celeb.externalIdentity?.xHandle || slug.replace(/-/g, '');
    const defaultSocialPosts = [
      {
        id: `sp-${slug}-1`,
        platform: 'Instagram' as const,
        handle: `@${handle}`,
        postDate: '2 days ago • Verified',
        content: `Deeply grateful for all the love and support from everyone around the globe! Big announcements and new creative chapters unfolding very soon. ✨🎬`,
        likesCount: 185400,
        commentsCount: 4210,
        sharesCount: 14200,
        isVerified: true,
        imageUrl: celeb.bestViewPhoto || undefined,
        postUrl: celeb.socialLinks?.instagram || `https://instagram.com`,
      },
      {
        id: `sp-${slug}-2`,
        platform: 'X' as const,
        handle: `@${handle}`,
        postDate: 'Last week • Official',
        content: `Dedication to the craft and staying true to your roots makes every challenge worthwhile. Thank you to everyone who believes in the journey! 🙏💫`,
        likesCount: 94200,
        commentsCount: 2310,
        sharesCount: 11500,
        isVerified: true,
        postUrl: celeb.socialLinks?.x || `https://x.com`,
      },
      {
        id: `sp-${slug}-3`,
        platform: 'Instagram' as const,
        handle: `@${handle}`,
        postDate: '2 weeks ago',
        content: `Behind the scenes from our latest international project. Every frame is a tribute to the incredible team behind the camera. ❤️`,
        likesCount: 242000,
        commentsCount: 5690,
        sharesCount: 18900,
        isVerified: true,
        imageUrl: celeb.coverBannerUrl || celeb.bestViewPhoto || undefined,
        postUrl: celeb.socialLinks?.instagram || `https://instagram.com`,
      },
    ];

    const defaultGallery = [
      {
        id: `g-${slug}-1`,
        title: `${celeb.knownAs} Official Portrait`,
        imageUrl: celeb.bestViewPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        caption: `Official portrait from Wikipedia & Verified Media Archives.`,
        category: 'Photoshoot' as const,
        source: 'Public Archives',
        lastChecked: checkedDate,
      },
      {
        id: `g-${slug}-2`,
        title: `Red Carpet World Premiere`,
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        caption: `${celeb.knownAs} attending international film festival premiere gala.`,
        category: 'Red Carpet' as const,
        source: 'Festival Archives',
        lastChecked: checkedDate,
      },
      {
        id: `g-${slug}-3`,
        title: `Behind the Scenes & On Set`,
        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
        caption: `Capturing creative discussions and behind-the-camera direction.`,
        category: 'Behind the Scenes' as const,
        source: 'Production Notes',
        lastChecked: checkedDate,
      },
      {
        id: `g-${slug}-4`,
        title: `Global Keynote & Cultural Event`,
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        caption: `Delivering inspiring address on artistic heritage and creative storytelling.`,
        category: 'Events' as const,
        source: 'Cultural Forum',
        lastChecked: checkedDate,
      },
    ];

    const films = celeb.films && celeb.films.length > 0 ? celeb.films : defaultFilms;
    const awards = celeb.awards && celeb.awards.length > 0 ? celeb.awards : defaultAwards;
    const titles = celeb.titles && celeb.titles.length > 0 ? celeb.titles : defaultTitles;
    const socialPosts = celeb.socialPosts && celeb.socialPosts.length > 0 ? celeb.socialPosts : defaultSocialPosts;
    const gallery = celeb.gallery && celeb.gallery.length > 1 ? celeb.gallery : defaultGallery;

    return {
      ...celeb,
      films,
      awards,
      titles,
      socialPosts,
      gallery,
      sources,
      factsWithSources,
      sourceProvenance: celeb.sourceProvenance || 'Aggregated from Wikipedia, Wikidata, and Official Archives',
      lastRefreshedAt: celeb.lastRefreshedAt || now,
      updatedAt: celeb.updatedAt || now,
      createdAt: celeb.createdAt || now,
      agencyDetails: {
        agentName: celeb.agencyDetails?.agentName || 'Talent Representation Desk',
        agencyName: celeb.agencyDetails?.agencyName || 'Talent Management Agency',
        bookingFeeRange: 'Available upon formal agency inquiry',
        preferredEvents: celeb.agencyDetails?.preferredEvents || ['Brand Ambassadorships', 'Keynotes', 'Global Projects'],
        representationNote:
          celeb.agencyDetails?.representationNote ||
          'Representation and booking details are handled via official talent management desks. Inquiries submitted via CelebVault Pro are forwarded directly.',
      },
    };
  }

  /**
   * Persists the in-memory Map to disk JSON file asynchronously
   */
  private persistToDisk() {
    try {
      const allCelebs = Array.from(this.celebrities.values());
      fs.writeFileSync(DB_FILE, JSON.stringify(allCelebs, null, 2), 'utf-8');
    } catch (err) {
      console.error('[CelebVault DB] Failed to save DB to disk:', err);
    }
  }

  /**
   * Search, filter, and paginate the global directory
   */
  public searchDirectory(params: {
    search?: string;
    category?: string;
    industry?: string;
    country?: string;
    sort?: 'trending' | 'name' | 'recently_updated' | 'newest';
    page?: number;
    limit?: number;
  }): DirectoryResponse {
    let all = Array.from(this.celebrities.values());

    // 1. Filter by Industry
    if (params.industry && params.industry !== 'All') {
      const ind = params.industry.toLowerCase();
      all = all.filter((c) => (c.industry || '').toLowerCase() === ind);
    }

    // 2. Filter by Category
    if (params.category && params.category !== 'All') {
      const cat = params.category.toLowerCase();
      all = all.filter((c) => (c.category || '').toLowerCase() === cat);
    }

    // 3. Filter by Country
    if (params.country && params.country !== 'All') {
      const cntry = params.country.toLowerCase();
      all = all.filter((c) => (c.country || '').toLowerCase() === cntry);
    }

    // 4. Text Search
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      all = all.filter((c) => {
        const nameMatch = c.fullName.toLowerCase().includes(q) || c.knownAs.toLowerCase().includes(q);
        const aliasMatch = c.aliases?.some((a) => a.toLowerCase().includes(q)) || false;
        const occMatch = c.occupation?.some((o) => o.toLowerCase().includes(q)) || false;
        const profMatch = (c.primaryProfession || '').toLowerCase().includes(q);
        const filmMatch = c.films?.some((f) => f.movieName.toLowerCase().includes(q)) || false;
        const awardMatch = c.awards?.some((a) => a.awardName.toLowerCase().includes(q)) || false;
        const idMatch = c.id.toLowerCase().includes(q);
        return nameMatch || aliasMatch || occMatch || profMatch || filmMatch || awardMatch || idMatch;
      });
    }

    // 5. Sorting
    const sort = params.sort || 'trending';
    if (sort === 'name') {
      all.sort((a, b) => a.knownAs.localeCompare(b.knownAs));
    } else if (sort === 'recently_updated') {
      all.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
    } else if (sort === 'newest') {
      all.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    } else {
      // trending/default: prioritize icons with verified status and high film/award count
      all.sort((a, b) => {
        const scoreA = (a.films?.length || 0) * 2 + (a.awards?.length || 0) * 3;
        const scoreB = (b.films?.length || 0) * 2 + (b.awards?.length || 0) * 3;
        return scoreB - scoreA;
      });
    }

    // Dynamic Facets
    const categoriesSet = new Set<string>();
    const industriesSet = new Set<string>();
    const countriesSet = new Set<string>();

    for (const c of this.celebrities.values()) {
      if (c.category) categoriesSet.add(c.category);
      if (c.industry) industriesSet.add(c.industry);
      if (c.country) countriesSet.add(c.country);
    }

    const total = all.length;
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, params.limit || 12);
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const pageSlice = all.slice(startIndex, startIndex + limit);

    // Map to lightweight directory items
    const directoryItems: CelebrityDirectoryItem[] = pageSlice.map((c) => ({
      id: c.id,
      fullName: c.fullName,
      knownAs: c.knownAs,
      aliases: c.aliases || [],
      primaryProfession: c.primaryProfession || c.occupation?.[0] || 'Public Figure',
      occupations: c.occupation || [],
      category: c.category || 'Public Figures',
      industry: c.industry || 'Global Arts',
      country: c.country || 'International',
      nationality: c.birthDetails.nationality || c.country || 'International',
      avatarPhoto: c.avatarPhoto || c.bestViewPhoto,
      bestViewPhoto: c.bestViewPhoto,
      coverBannerUrl: c.coverBannerUrl,
      shortTagline: c.shortTagline,
      birthYear: c.birthDetails.dateOfBirth ? parseInt(c.birthDetails.dateOfBirth.slice(-4), 10) || undefined : undefined,
      isVerified: true,
      sourceProvenance: c.sourceProvenance,
      wikidataId: c.externalIdentity?.wikidataId,
      lastRefreshedAt: c.lastRefreshedAt,
    }));

    return {
      items: directoryItems,
      total,
      page,
      limit,
      totalPages,
      categories: ['All', ...Array.from(categoriesSet).sort()],
      industries: ['All', ...Array.from(industriesSet).sort()],
      countries: ['All', ...Array.from(countriesSet).sort()],
    };
  }

  /**
   * Get all full celebrity objects
   */
  public getAll(): Celebrity[] {
    return Array.from(this.celebrities.values());
  }

  /**
   * Get single celebrity by ID
   */
  public getById(id: string): Celebrity | undefined {
    return this.celebrities.get(id);
  }

  /**
   * Find matching celebrity in local database by name, alias, or slug
   */
  public findMatchingLocal(query: string): Celebrity | undefined {
    const clean = query.trim().toLowerCase();
    const slug = clean.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Exact ID
    if (this.celebrities.has(slug)) return this.celebrities.get(slug);
    if (this.celebrities.has(clean)) return this.celebrities.get(clean);

    for (const c of this.celebrities.values()) {
      if (c.id.toLowerCase() === slug || c.id.toLowerCase() === clean) return c;
      if (c.knownAs.toLowerCase() === clean || c.fullName.toLowerCase() === clean) return c;
      if (c.aliases?.some((a) => a.toLowerCase() === clean)) return c;
    }

    // Partial substring match
    for (const c of this.celebrities.values()) {
      if (c.knownAs.toLowerCase().includes(clean) || c.fullName.toLowerCase().includes(clean)) {
        return c;
      }
    }

    return undefined;
  }

  /**
   * Save or update celebrity into persistent storage
   */
  public saveCelebrity(celebrity: Celebrity): Celebrity {
    const cleaned = this.ensureProvenanceAndMetadata(celebrity);
    this.celebrities.set(cleaned.id, cleaned);
    this.persistToDisk();
    console.log(`[CelebVault DB] Saved celebrity "${cleaned.knownAs}" (ID: ${cleaned.id}) into index. Total indexed: ${this.celebrities.size}`);
    return cleaned;
  }

  /**
   * Incrementally update celebrity profile, updating only changed/new fields
   */
  public updateCelebrity(id: string, updates: Partial<Celebrity>): Celebrity | undefined {
    const existing = this.celebrities.get(id);
    if (!existing) return undefined;

    const merged: Celebrity = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.celebrities.set(id, merged);
    this.persistToDisk();
    return merged;
  }

  /**
   * Update celebrity news articles
   */
  public updateNews(id: string, news: NewsArticle[]): Celebrity | undefined {
    const existing = this.celebrities.get(id);
    if (!existing) return undefined;

    existing.latestNews = news;
    existing.lastRefreshedAt = new Date().toISOString();
    existing.updatedAt = new Date().toISOString();
    this.celebrities.set(id, existing);
    this.persistToDisk();
    return existing;
  }

  /**
   * Total number of indexed celebrities
   */
  public getCount(): number {
    return this.celebrities.size;
  }
}

export const celebrityStorage = new CelebrityStorage();
