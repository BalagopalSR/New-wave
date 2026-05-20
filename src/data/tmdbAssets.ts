import { tmdbBackdrop, tmdbPoster } from './tmdb';

/**
 * Current TMDB poster + backdrop paths (from themoviedb.org, May 2026).
 * Old file_path values in localStorage often 404 after TMDB CDN updates.
 */
export const TMDB_ASSETS: Record<
  string,
  { poster: string; backdrop: string }
> = {
  inception: {
    poster: '/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    backdrop: '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
  },
  'dark-knight': {
    poster: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: '/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg',
  },
  interstellar: {
    poster: '/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    backdrop: '/2ssWTSVklAEc98frZUQhgtGHx7s.jpg',
  },
  parasite: {
    poster: '/igICOruFgiqdY1HXwTNRuXJute.jpg',
    backdrop: '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
  },
  endgame: {
    poster: '/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    backdrop: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
  },
  oppenheimer: {
    poster: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: '/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg',
  },
  dune: {
    poster: '/pc15b0pi8o1oUv9vNhakwMQ9TxA.jpg',
    backdrop: '/zRKQW58MBEY078AxkHxEJzUskCl.jpg',
  },
  'everything-everywhere': {
    poster: '/u68AjlvlutfEIcpmbYpKcdi09ut.jpg',
    backdrop: '/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg',
  },
  joker: {
    poster: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    backdrop: '/hO7KbdvGOtDdeg0W4Y5nKEHeDDh.jpg',
  },
  'spider-verse': {
    poster: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop: '/9xfDWXAUbFXQK585JvByT5pEAhe.jpg',
  },
};

export function movieImages(movieId: string) {
  const a = TMDB_ASSETS[movieId];
  if (!a) return null;
  return {
    posterImage: tmdbPoster(a.poster),
    bannerImage: tmdbBackdrop(a.backdrop),
  };
}

export function hasTmdbAssets(movieId: string) {
  return movieId in TMDB_ASSETS;
}
