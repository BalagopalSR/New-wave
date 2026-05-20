import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { CinematicImage } from '../components/CinematicImage/CinematicImage';
import type { Movie } from '../types/content';

function getMoviesWithAchievements(movies: Movie[]) {
  return movies.filter((m) => m.awards.length > 0 || m.isAwardWinner);
}

export function AwardWinnersPage() {
  const { movies } = useContent();
  const achievers = getMoviesWithAchievements(movies);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="page-hero relative flex min-h-[40vh] items-end pt-20">
        <div className="page-hero-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">Red Carpet</p>
          <h1 className="mt-2 font-display text-4xl text-cinematic-ivory md:text-5xl">
            Award Winners &amp; Achievements
          </h1>
          <p className="mt-4 max-w-2xl text-cinematic-muted">
            Films recognized at festivals and ceremonies around the world.
          </p>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        {achievers.length === 0 ? (
          <p className="text-center text-cinematic-muted">No award-winning films in the catalog yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {achievers.map((movie, i) => (
              <motion.article
                key={movie.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-6 overflow-hidden rounded-2xl border border-white/10 bg-cinematic-surface p-6"
              >
                <Link to={`/movies/${movie.id}`} className="shrink-0">
                  <CinematicImage
                    src={movie.posterImage}
                    alt={`${movie.title} poster`}
                    fallbackSrc={movie.bannerImage}
                    className="h-40 w-28 rounded-xl object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/movies/${movie.id}`}
                    className="font-display text-xl text-cinematic-ivory hover:text-cinematic-gold"
                  >
                    {movie.title}
                  </Link>
                  <p className="mt-1 text-sm text-cinematic-muted">
                    {movie.year} · {movie.genre.join(' · ')}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {movie.awards.map((award) => (
                      <li
                        key={`${award.title}-${award.festival}-${award.year}`}
                        className="rounded-xl border border-cinematic-gold/20 bg-cinematic-bg/50 p-3"
                      >
                        <div className="flex items-start gap-2">
                          <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-cinematic-gold" />
                          <div>
                            <p className="text-sm font-medium text-cinematic-ivory">{award.title}</p>
                            <p className="text-xs text-cinematic-gold">
                              {award.festival} · {award.year} · {award.status}
                            </p>
                            {award.description && (
                              <p className="mt-1 text-xs text-cinematic-muted">{award.description}</p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {movie.awards.length === 0 && movie.isAwardWinner && (
                    <p className="mt-2 text-sm text-cinematic-muted">Recognized award-winning film.</p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
