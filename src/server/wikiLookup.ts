/**
 * Legitimate public Wikipedia & Wikidata lookup utility for global celebrity discovery.
 * Queries public endpoints without authentication or web scraping.
 */

export interface WikiCelebrityResult {
  found: boolean;
  title?: string;
  extract?: string;
  thumbnailUrl?: string;
  originalImageUrl?: string;
  pageUrl?: string;
  description?: string;
}

export async function searchWikipediaPublicFigure(query: string): Promise<WikiCelebrityResult> {
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return { found: false };
    }

    // 1. Search Wikipedia API for matching page
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      cleanQuery
    )}&utf8=&format=json&srlimit=1&origin=*`;

    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'CelebVaultPro/1.0 (https://ais-build.app; public-directory)' },
    });

    if (!searchRes.ok) {
      return { found: false };
    }

    const searchData: any = await searchRes.json();
    const firstHit = searchData?.query?.search?.[0];

    if (!firstHit || !firstHit.title) {
      return { found: false };
    }

    const pageTitle = firstHit.title;

    // 2. Fetch page extract, thumbnail, pageprops, and original image
    const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|info&inprop=url&exintro=true&explaintext=true&pithumbsize=800&piprop=thumbnail|original&titles=${encodeURIComponent(
      pageTitle
    )}&format=json&origin=*`;

    const detailsRes = await fetch(detailsUrl, {
      headers: { 'User-Agent': 'CelebVaultPro/1.0 (https://ais-build.app; public-directory)' },
    });

    if (!detailsRes.ok) {
      return { found: false, title: pageTitle };
    }

    const detailsData: any = await detailsRes.json();
    const pages = detailsData?.query?.pages || {};
    const pageId = Object.keys(pages)[0];

    if (!pageId || pageId === '-1') {
      return { found: false, title: pageTitle };
    }

    const page = pages[pageId];
    const extract = page.extract || '';
    const thumbnailUrl = page.thumbnail?.source || page.original?.source;
    const originalImageUrl = page.original?.source || page.thumbnail?.source;
    const pageUrl = page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/\s+/g, '_'))}`;

    return {
      found: true,
      title: pageTitle,
      extract,
      thumbnailUrl,
      originalImageUrl,
      pageUrl,
      description: extract.slice(0, 200),
    };
  } catch (error) {
    console.error('Wikipedia lookup error for query:', query, error);
    return { found: false };
  }
}
