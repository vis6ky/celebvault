/**
 * Utility to provide reliable image URLs.
 * Routes Wikipedia / Wikimedia and external media through our server image proxy
 * to prevent HTTP 403 / 429 hotlinking restrictions.
 */

export function getSafeImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return '';
  }

  const cleanUrl = url.trim();

  // If already proxied, data URI, or relative path
  if (cleanUrl.startsWith('/api/proxy-image') || cleanUrl.startsWith('data:') || cleanUrl.startsWith('/')) {
    return cleanUrl;
  }

  // If it is from wikimedia / wikipedia / external CDNs that might block hotlinks
  if (
    cleanUrl.includes('wikimedia.org') ||
    cleanUrl.includes('wikipedia.org') ||
    cleanUrl.includes('wikinews.org') ||
    cleanUrl.includes('imdb.com') ||
    cleanUrl.includes('media-amazon.com')
  ) {
    return `/api/proxy-image?url=${encodeURIComponent(cleanUrl)}`;
  }

  return cleanUrl;
}

/**
 * Returns a stylized SVG data URI monogram fallback if an image fails to load
 */
export function getMonogramFallback(name: string, category = 'Celebrity'): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'CV';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18181b"/>
        <stop offset="50%" stop-color="#09090b"/>
        <stop offset="100%" stop-color="#000000"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
    </defs>
    <rect width="600" height="800" fill="url(#g)"/>
    <circle cx="300" cy="360" r="140" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
    <circle cx="300" cy="360" r="130" fill="none" stroke="url(#gold)" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="300" y="395" font-family="serif, Georgia, Times" font-size="88" font-weight="bold" fill="url(#gold)" text-anchor="middle">${initials}</text>
    <text x="300" y="550" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="bold" fill="#f4f4f5" text-anchor="middle">${name.replace(/&/g, '&amp;')}</text>
    <text x="300" y="590" font-family="monospace, monospace" font-size="14" fill="#a1a1aa" text-anchor="middle" letter-spacing="3">${category.toUpperCase()} • OFFICIAL ENTRY</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
