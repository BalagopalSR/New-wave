import { motion } from 'framer-motion';
import { Eye, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/content';
import { CinematicImage } from '../CinematicImage/CinematicImage';

type MovieCardProps = {
  movie: Movie;
  variant?: 'poster' | 'compact';
  onPlayTrailer?: (url: string, title: string) => void;
};

export function MovieCard({ movie, variant = 'poster', onPlayTrailer }: MovieCardProps) {
  if (variant === 'compact') {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-cinematic-surface transition hover:border-cinematic-gold/30 hover:shadow-gold"
      >
        <Link to={`/movies/${movie.id}`} className="relative aspect-[2/3] overflow-hidden h-52 sm:h-56">
          <CinematicImage
            src={movie.posterImage}
            alt={`${movie.title} poster`}
            fallbackSrc={movie.bannerImage}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </Link>
        <motion.div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-lg text-cinematic-ivory">
            <Link to={`/movies/${movie.id}`} className="hover:text-cinematic-gold">
              {movie.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-cinematic-muted">
            {movie.genre.join(' · ')} · {movie.year}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-cinematic-muted">{movie.description}</p>
          <motion.div className="mt-4 flex items-center gap-2">
            <Link to={`/movies/${movie.id}`} className="btn-primary flex-1 py-2 text-sm">
              View Details
            </Link>
            <button
              type="button"
              onClick={() => onPlayTrailer?.(movie.trailerUrl, movie.title)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-cinematic-gold hover:text-cinematic-gold"
              aria-label={`Play trailer for ${movie.title}`}
            >
              <Play className="h-4 w-4 fill-current" />
            </button>
          </motion.div>
        </motion.div>
      </motion.article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-cinematic-surface transition hover:-translate-y-1 hover:border-cinematic-gold/25 hover:shadow-gold">
      <div className="relative block aspect-[2/3] overflow-hidden">
        <CinematicImage
          src={movie.posterImage}
          alt={`${movie.title} poster`}
          fallbackSrc={movie.bannerImage}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <Link
          to={`/movies/${movie.id}`}
          className="absolute inset-0 z-[1]"
          aria-label={`View ${movie.title}`}
        >
          <span className="sr-only">View {movie.title}</span>
        </Link>
        <motion.div className="pointer-events-none absolute inset-0 z-[2] bg-card-fade opacity-0 transition group-hover:opacity-100" />
        <motion.div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center gap-3 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPlayTrailer?.(movie.trailerUrl, movie.title);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cinematic-gold text-cinematic-bg shadow-gold animate-pulse-play"
            aria-label={`Play trailer for ${movie.title}`}
          >
            <Play className="h-5 w-5 fill-current" />
          </button>
          <Link
            to={`/movies/${movie.id}`}
            className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm backdrop-blur-sm transition hover:border-cinematic-gold"
          >
            <Eye className="h-4 w-4" /> View Details
          </Link>
        </motion.div>
      </div>
      <motion.div className="p-4">
        <h3 className="font-display text-lg text-cinematic-ivory line-clamp-1">{movie.title}</h3>
        <p className="mt-1 text-xs text-cinematic-muted">
          {movie.genre[0]} · {movie.year} · {movie.rating}
        </p>
        <p className="mt-1 text-xs text-cinematic-muted">{movie.duration}</p>
        <Link
          to={`/movies/${movie.id}`}
          className="mt-3 inline-block text-sm font-medium text-cinematic-gold hover:underline"
        >
          View Details
        </Link>
      </motion.div>
    </article>
  );
}
