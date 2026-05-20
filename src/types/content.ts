export type Movie = {
  id: string;
  title: string;
  slug: string;
  description: string;
  synopsis: string;
  genre: string[];
  year: number;
  duration: string;
  rating: string;
  releaseDate: string;
  language: string;
  director: string;
  productionCompany: string;
  country: string;
  cast: {
    name: string;
    role: string;
    character?: string;
    image: string;
  }[];
  posterImage: string;
  bannerImage: string;
  galleryImages: { image: string; caption: string }[];
  trailerUrl: string;
  watchUrl: string;
  clips: {
    title: string;
    category: 'Trailer' | 'Teaser' | 'Interview' | 'Behind the Scenes';
    duration: string;
    thumbnail: string;
    videoUrl: string;
  }[];
  awards: {
    title: string;
    festival: string;
    year: number;
    status: 'Winner' | 'Nominated';
    description: string;
  }[];
  trendingRank?: number;
  isLatest?: boolean;
  isTrending?: boolean;
  isAwardWinner?: boolean;
};

export type HeroBanner = {
  id: string;
  movieId: string;
  enabled: boolean;
  order: number;
  customTitle?: string;
  customDescription?: string;
  customBackgroundImage?: string;
  customPosterImage?: string;
};

export type SiteContent = {
  movies: Movie[];
  banners: HeroBanner[];
};

export const GENRES = [
  'All',
  'Action',
  'Drama',
  'Sci-Fi',
  'Thriller',
  'Documentary',
  'Romance',
  'Animation',
  'Mystery',
  'Adventure',
  'Comedy',
  'History',
  'Crime',
] as const;

export type SortOption = 'Latest' | 'Most Popular' | 'Highest Rated' | 'Award Winners';
