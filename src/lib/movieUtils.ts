import type { Movie, SortOption } from '../types/content';
import { pickImageUrl } from './imageUrl';

export function getMovieById(movies: Movie[], id: string) {
  return movies.find((m) => m.id === id);
}

export function getSimilarMovies(movies: Movie[], movie: Movie, limit = 8) {
  return movies
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genre.some((g) => movie.genre.includes(g)),
    )
    .slice(0, limit);
}

export function getLatestMovies(movies: Movie[]) {
  return movies.filter((m) => m.isLatest);
}

export function getTrendingMovies(movies: Movie[]) {
  return movies
    .filter((m) => m.isTrending)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
}

export type ShowcaseAward = {
  movieId: string;
  movieTitle: string;
  award: Movie['awards'][0];
  posterImage: string;
};

export function getShowcaseAwards(movies: Movie[]): ShowcaseAward[] {
  return getAllAwards(movies).slice(0, 4);
}

export function getAllAwards(movies: Movie[]): ShowcaseAward[] {
  const items: ShowcaseAward[] = [];
  movies.forEach((m) => {
    m.awards.forEach((a) => {
      items.push({ movieId: m.id, movieTitle: m.title, award: a, posterImage: m.posterImage });
    });
  });
  return items.sort((a, b) => b.award.year - a.award.year);
}

export function getAllClips(movies: Movie[]) {
  return movies.flatMap((m) =>
    m.clips.map((c) => ({
      ...c,
      movieTitle: m.title,
      movieId: m.id,
      /** Prefer movie artwork — clip.thumbnail often points at removed TMDB paths */
      thumbnail: pickImageUrl(m.bannerImage, m.posterImage, c.thumbnail),
      posterFallback: m.posterImage,
      bannerFallback: m.bannerImage,
    })),
  );
}

export function getGalleryImages(movies: Movie[]) {
  const items: { image: string; caption: string; movieTitle: string }[] = [];
  movies.forEach((m) => {
    m.galleryImages.forEach((g) => {
      items.push({ ...g, movieTitle: m.title });
    });
  });
  return items;
}

export type SearchSuggestion = {
  id: string;
  label: string;
  subtitle?: string;
  href: string;
  kind: 'movie' | 'genre' | 'director';
};

export function getSearchSuggestions(movies: Movie[], query: string, limit = 8): SearchSuggestion[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const results: SearchSuggestion[] = [];
  const seen = new Set<string>();

  for (const m of movies) {
    if (results.length >= limit) break;
    const haystack = [
      m.title,
      m.description,
      m.director,
      ...m.genre,
      ...m.cast.map((c) => c.name),
    ]
      .join(' ')
      .toLowerCase();
    if (haystack.includes(q)) {
      const key = `movie-${m.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({
          id: key,
          label: m.title,
          subtitle: `${m.year} · ${m.genre[0] ?? 'Film'}`,
          href: `/movies/${m.id}`,
          kind: 'movie',
        });
      }
    }
  }

  for (const m of movies) {
    if (results.length >= limit) break;
    if (m.director.toLowerCase().includes(q)) {
      const key = `director-${m.director}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({
          id: key,
          label: m.director,
          subtitle: 'Director',
          href: `/movies?q=${encodeURIComponent(m.director)}`,
          kind: 'director',
        });
      }
    }
  }

  const allGenres = new Set(movies.flatMap((m) => m.genre));
  for (const g of allGenres) {
    if (results.length >= limit) break;
    if (g.toLowerCase().includes(q)) {
      const key = `genre-${g}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({
          id: key,
          label: g,
          subtitle: 'Genre',
          href: `/movies?genre=${encodeURIComponent(g)}`,
          kind: 'genre',
        });
      }
    }
  }

  return results.slice(0, limit);
}

export function searchMovies(movies: Movie[], query: string): Movie[] {
  const q = query.trim().toLowerCase();
  if (!q) return movies;

  return movies.filter((m) => {
    const haystack = [
      m.title,
      m.description,
      m.synopsis,
      m.director,
      m.productionCompany,
      m.country,
      m.language,
      ...m.genre,
      ...m.cast.map((c) => `${c.name} ${c.character ?? ''}`),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterAndSortMovies(
  movies: Movie[],
  opts: { search: string; genre: string; sort: SortOption },
): Movie[] {
  let list = searchMovies(movies, opts.search);

  if (opts.genre !== 'All') {
    list = list.filter((m) =>
      m.genre.some((g) => g.toLowerCase() === opts.genre.toLowerCase()),
    );
  }

  switch (opts.sort) {
    case 'Latest':
      list = [...list].sort((a, b) => b.year - a.year);
      break;
    case 'Most Popular':
      list = [...list].sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99));
      break;
    case 'Highest Rated':
      list = [...list].sort((a, b) => a.rating.localeCompare(b.rating));
      break;
    case 'Award Winners':
      list = list.filter((m) => m.isAwardWinner);
      break;
  }

  return list;
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function createEmptyMovie(): Movie {
  return {
    id: crypto.randomUUID(),
    title: '',
    slug: '',
    description: '',
    synopsis: '',
    genre: ['Drama'],
    year: new Date().getFullYear(),
    duration: '2h 00m',
    rating: 'PG-13',
    releaseDate: '',
    language: 'English',
    director: '',
    productionCompany: '',
    country: '',
    cast: [],
    posterImage: '',
    bannerImage: '',
    galleryImages: [],
    trailerUrl: '',
    watchUrl: '',
    clips: [],
    awards: [],
    isLatest: false,
    isTrending: false,
    isAwardWinner: false,
  };
}
