import type { HeroBanner, Movie, SiteContent } from '../types/content';
import { defaultBanners, defaultMovies } from '../data/defaultMovies';
import { movieImages } from '../data/tmdbAssets';
import { isTmdbImageUrl } from '../data/tmdb';
import { normalizeImageUrl, pickImageUrl } from './imageUrl';
import { repairVideoUrl } from './videoUrl';
import { clearAdminSession, isAdminAuthenticated as checkAuth } from './auth';

const CONTENT_KEY = 'newwave_content';

/** Bump when image repair logic changes */
const CONTENT_VERSION = 6;

function isUserUploadedImage(url: string | undefined): boolean {
  const n = normalizeImageUrl(url);
  return n.startsWith('data:') || n.startsWith('blob:');
}

function resolveMovieImage(
  current: string | undefined,
  defaultUrl: string | undefined,
  fallbackUrl: string,
): string {
  if (isUserUploadedImage(current)) {
    return normalizeImageUrl(current);
  }
  if (current?.trim() && !isTmdbImageUrl(current)) {
    return normalizeImageUrl(current);
  }
  return pickImageUrl(defaultUrl, fallbackUrl, current);
}

function repairMovie(movie: Movie): Movie {
  const defaults = movieImages(movie.id);

  const posterImage = resolveMovieImage(
    movie.posterImage,
    defaults?.posterImage,
    defaults?.bannerImage ?? '',
  );

  const bannerImage = resolveMovieImage(
    movie.bannerImage,
    defaults?.bannerImage,
    posterImage,
  );

  const clips = (movie.clips ?? []).map((c) => ({
    ...c,
    thumbnail: pickImageUrl(bannerImage, posterImage, c.thumbnail),
  }));

  const galleryImages = (movie.galleryImages ?? []).map((g) => ({
    ...g,
    image: pickImageUrl(g.image, bannerImage, posterImage),
  }));

  const clipsWithVideo = clips.map((c) => ({
    ...c,
    videoUrl: repairVideoUrl(c.videoUrl),
  }));

  return {
    ...movie,
    trailerUrl: repairVideoUrl(movie.trailerUrl),
    watchUrl: movie.watchUrl ? repairVideoUrl(movie.watchUrl) : '',
    posterImage,
    bannerImage,
    clips: clipsWithVideo,
    galleryImages,
  };
}

function normalizeBanner(banner: HeroBanner): HeroBanner {
  return {
    ...banner,
    customBackgroundImage: banner.customBackgroundImage
      ? normalizeImageUrl(banner.customBackgroundImage)
      : undefined,
    customPosterImage: banner.customPosterImage
      ? normalizeImageUrl(banner.customPosterImage)
      : undefined,
  };
}

export function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (!raw) {
      return { movies: defaultMovies, banners: defaultBanners };
    }
    const parsed = JSON.parse(raw) as SiteContent & { version?: number };
    if (!parsed.movies?.length) {
      const fresh = { movies: defaultMovies, banners: defaultBanners };
      saveContent(fresh);
      return fresh;
    }

    const movies = parsed.movies.map(repairMovie);
    const banners = (parsed.banners?.length ? parsed.banners : defaultBanners).map(
      normalizeBanner,
    );

    const content = { movies, banners };

    if (parsed.version !== CONTENT_VERSION) {
      saveContent(content);
    }

    return content;
  } catch {
    return { movies: defaultMovies, banners: defaultBanners };
  }
}

export function saveContent(content: SiteContent) {
  const repaired: SiteContent = {
    movies: content.movies.map(repairMovie),
    banners: content.banners.map(normalizeBanner),
  };
  localStorage.setItem(
    CONTENT_KEY,
    JSON.stringify({ ...repaired, version: CONTENT_VERSION }),
  );
}

export function resetContent(): SiteContent {
  const fresh = { movies: defaultMovies, banners: defaultBanners };
  saveContent(fresh);
  return fresh;
}

export function isAdminAuthenticated(): boolean {
  return checkAuth();
}

export function setAdminAuthenticated(value: boolean) {
  if (!value) clearAdminSession();
}

export type { HeroBanner, Movie, SiteContent };
