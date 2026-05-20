import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/content';
import { CinematicImage } from '../CinematicImage/CinematicImage';

type TrendingCardProps = {
  movie: Movie;
  onPlayTrailer?: (url: string, title: string) => void;
};

export function TrendingCard({ movie, onPlayTrailer }: TrendingCardProps) {
  const rank = movie.trendingRank ?? 0;

  return (
    <article className="group relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-white/10 transition-transform duration-300 hover:-translate-y-1 md:min-h-[380px]">
      <CinematicImage
        src={movie.bannerImage}
        alt={`${movie.title} backdrop`}
        fallbackSrc={movie.posterImage}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 transition group-hover:from-black group-hover:via-black/70" aria-hidden />
      <div className="absolute left-4 top-4 flex items-start gap-3 md:left-6 md:top-6">
        <span className="font-display text-5xl font-bold text-cinematic-gold drop-shadow-gold transition group-hover:drop-shadow-[0_0_20px_rgba(214,168,79,0.8)] md:text-6xl">
          #{rank}
        </span>
        <span className="mt-2 rounded-full bg-cinematic-crimson px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
          Trending
        </span>
      </div>
      <button
        type="button"
        onClick={() => onPlayTrailer?.(movie.trailerUrl, movie.title)}
        className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-cinematic-gold/90 text-cinematic-bg opacity-0 shadow-gold transition group-hover:opacity-100 md:right-6 md:top-6"
        aria-label={`Play ${movie.title} trailer`}
      >
        <Play className="h-6 w-6 fill-current" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
        <h3 className="font-display text-2xl text-cinematic-ivory md:text-3xl">{movie.title}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-cinematic-muted">
          {movie.genre.join(' · ')}
          <span className="flex items-center gap-1 text-cinematic-gold">
            <Star className="h-3.5 w-3.5 fill-current" />
            {movie.rating}
          </span>
          · {movie.year}
        </p>
        <p className="mt-3 line-clamp-2 max-w-lg text-sm text-cinematic-muted">{movie.description}</p>
        <Link
          to={`/movies/${movie.id}`}
          className="mt-4 inline-block text-sm font-medium text-cinematic-gold hover:underline"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
