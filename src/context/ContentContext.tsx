import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { HeroBanner, Movie, SiteContent } from '../types/content';
import { defaultBanners, defaultMovies } from '../data/defaultMovies';
import { loadContent, saveContent } from '../lib/storage';
import { slugify } from '../lib/movieUtils';

type ContentContextValue = {
  movies: Movie[];
  banners: HeroBanner[];
  addMovie: (movie: Movie) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (id: string) => void;
  setBanners: (banners: HeroBanner[]) => void;
  updateBanner: (banner: HeroBanner) => void;
  addBanner: (banner: HeroBanner) => void;
  deleteBanner: (id: string) => void;
  resetToDefaults: () => void;
  getHeroMovies: () => Movie[];
};

const ContentContext = createContext<ContentContextValue | null>(null);

const SERVER_SNAPSHOT: SiteContent = {
  movies: defaultMovies,
  banners: defaultBanners,
};

let clientSnapshot: SiteContent = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function getSnapshot() {
  return clientSnapshot;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function updateContent(updater: (prev: SiteContent) => SiteContent) {
  const next = updater(clientSnapshot);
  saveContent(next);
  clientSnapshot = next;
  emitChange();
}

function resolveHeroMovies(movies: Movie[], banners: HeroBanner[]): Movie[] {
  return banners
    .filter((b) => b.enabled)
    .sort((a, b) => a.order - b.order)
    .map((b) => {
      const movie = movies.find((m) => m.id === b.movieId);
      if (!movie) return null;
      return {
        ...movie,
        title: b.customTitle || movie.title,
        description: b.customDescription || movie.description,
        bannerImage: b.customBackgroundImage || movie.bannerImage,
        posterImage: b.customPosterImage || movie.posterImage,
      };
    })
    .filter((m): m is Movie => m !== null);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const content = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    clientSnapshot = loadContent();
    emitChange();
  }, []);

  const persist = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    updateContent(updater);
  }, []);

  const addMovie = useCallback(
    (movie: Movie) => {
      const slug = movie.slug || slugify(movie.title);
      const withMeta = { ...movie, slug, id: movie.id || slug };
      persist((prev) => ({ ...prev, movies: [...prev.movies, withMeta] }));
    },
    [persist],
  );

  const updateMovie = useCallback(
    (movie: Movie) => {
      persist((prev) => ({
        ...prev,
        movies: prev.movies.map((m) => (m.id === movie.id ? movie : m)),
      }));
    },
    [persist],
  );

  const deleteMovie = useCallback(
    (id: string) => {
      persist((prev) => ({
        movies: prev.movies.filter((m) => m.id !== id),
        banners: prev.banners.filter((b) => b.movieId !== id),
      }));
    },
    [persist],
  );

  const setBanners = useCallback(
    (banners: HeroBanner[]) => {
      persist((prev) => ({ ...prev, banners }));
    },
    [persist],
  );

  const updateBanner = useCallback(
    (banner: HeroBanner) => {
      persist((prev) => ({
        ...prev,
        banners: prev.banners.map((b) => (b.id === banner.id ? banner : b)),
      }));
    },
    [persist],
  );

  const addBanner = useCallback(
    (banner: HeroBanner) => {
      persist((prev) => ({ ...prev, banners: [...prev.banners, banner] }));
    },
    [persist],
  );

  const deleteBanner = useCallback(
    (id: string) => {
      persist((prev) => ({ ...prev, banners: prev.banners.filter((b) => b.id !== id) }));
    },
    [persist],
  );

  const resetToDefaults = useCallback(() => {
    persist(() => ({ movies: defaultMovies, banners: defaultBanners }));
  }, [persist]);

  const value = useMemo<ContentContextValue>(
    () => ({
      movies: content.movies,
      banners: content.banners,
      addMovie,
      updateMovie,
      deleteMovie,
      setBanners,
      updateBanner,
      addBanner,
      deleteBanner,
      resetToDefaults,
      getHeroMovies: () => {
        const resolved = resolveHeroMovies(content.movies, content.banners);
        return resolved.length > 0 ? resolved : content.movies.slice(0, 3);
      },
    }),
    [
      content,
      addMovie,
      updateMovie,
      deleteMovie,
      setBanners,
      updateBanner,
      addBanner,
      deleteBanner,
      resetToDefaults,
    ],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
