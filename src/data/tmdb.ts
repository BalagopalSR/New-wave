/** TMDB image CDN — use media.themoviedb.org (current CDN; image.tmdb.org mirrors paths) */
const TMDB_IMAGE_HOST = 'https://media.themoviedb.org/t/p';

export const tmdbPoster = (path: string) =>
  `${TMDB_IMAGE_HOST}/w500${path.startsWith('/') ? path : `/${path}`}`;

export const tmdbBackdrop = (path: string) =>
  `${TMDB_IMAGE_HOST}/w1280${path.startsWith('/') ? path : `/${path}`}`;

/** Legacy host — kept for migration of stored URLs */
export const LEGACY_TMDB_HOST = 'https://image.tmdb.org/t/p';

export function isTmdbImageUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return /image\.tmdb\.org|media\.themoviedb\.org/i.test(url);
}
