/**
 * Normalize image URLs from admin input so they load reliably in the browser.
 */
export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (/^[\w.-]+\.[a-z]{2,}/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

export function isDisplayableImageUrl(url: string): boolean {
  const n = normalizeImageUrl(url);
  if (!n) return false;
  return (
    n.startsWith('data:') ||
    n.startsWith('blob:') ||
    n.startsWith('http://') ||
    n.startsWith('https://')
  );
}

/** First valid URL wins — used for poster/banner/clip fallbacks */
export function pickImageUrl(...candidates: (string | undefined | null)[]): string {
  for (const c of candidates) {
    const n = normalizeImageUrl(c);
    if (isDisplayableImageUrl(n)) return n;
  }
  return '';
}

/** Optional proxy when TMDB/CDN blocks hotlinking */
/** Rewrite legacy image.tmdb.org URLs to the current media CDN */
export function toCurrentTmdbCdn(url: string): string {
  const n = normalizeImageUrl(url);
  if (!n.includes('image.tmdb.org/t/p/')) return n;
  return n.replace('https://image.tmdb.org/t/p/', 'https://media.themoviedb.org/t/p/');
}

export function proxyImageUrl(url: string): string {
  const n = toCurrentTmdbCdn(normalizeImageUrl(url));
  if (!n || n.startsWith('data:') || n.startsWith('blob:')) return n;
  if (n.includes('wsrv.nl/')) return n;
  return `https://wsrv.nl/?url=${encodeURIComponent(n)}&w=1280&output=webp`;
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file (JPEG, PNG, WebP, etc.).'));
      return;
    }
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      reject(new Error('Image must be under 2MB for browser storage.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}
