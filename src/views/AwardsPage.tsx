import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Trophy } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getAllAwards } from '../lib/movieUtils';
import { CinematicImage } from '../components/CinematicImage/CinematicImage';

export function AwardsPage() {
  const { movies } = useContent();
  const awards = getAllAwards(movies);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-hidden">
      <section className="page-hero relative flex min-h-[36vh] items-end pt-20 sm:min-h-[40vh]">
        <div className="page-hero-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-10 pt-8 sm:px-6 sm:pb-12 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">Red Carpet</p>
          <h1 className="mt-2 font-display text-3xl text-cinematic-ivory sm:text-4xl md:text-5xl">
            Awards &amp; Achievements
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-cinematic-muted sm:text-base">
            Every honor earned by films in our catalog — festivals, ceremonies, and critics&apos;
            circles worldwide.
          </p>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        {awards.length === 0 ? (
          <p className="text-center text-cinematic-muted">No awards listed yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {awards.map((item, i) => {
              const isWinner = item.award.status === 'Winner';
              return (
                <motion.li
                  key={`${item.movieId}-${item.award.title}-${item.award.year}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-cinematic-surface sm:flex-row lg:flex-col"
                >
                  <Link
                    to={`/movies/${item.movieId}`}
                    className="relative aspect-[16/10] shrink-0 sm:w-36 lg:aspect-[4/3] lg:w-full h-52 sm:h-56"
                  >
                    <CinematicImage
                      src={item.posterImage}
                      alt={`${item.movieTitle} poster`}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-start gap-2">
                      {isWinner ? (
                        <Trophy className="h-5 w-5 shrink-0 text-cinematic-gold" aria-hidden />
                      ) : (
                        <Award className="h-5 w-5 shrink-0 text-cinematic-bronze" aria-hidden />
                      )}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                          isWinner
                            ? 'bg-cinematic-gold/20 text-cinematic-gold'
                            : 'bg-cinematic-bronze/20 text-cinematic-bronze'
                        }`}
                      >
                        {item.award.status}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-lg text-cinematic-ivory sm:text-xl">
                      {item.award.title}
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-wider text-cinematic-muted">
                      {item.award.festival}
                    </p>
                    <p className="text-sm text-cinematic-gold">{item.award.year}</p>
                    <Link
                      to={`/movies/${item.movieId}`}
                      className="mt-2 text-sm font-medium text-cinematic-ivory hover:text-cinematic-gold"
                    >
                      {item.movieTitle}
                    </Link>
                    {item.award.description && (
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-cinematic-muted">
                        {item.award.description}
                      </p>
                    )}
                    <Link
                      to={`/movies/${item.movieId}`}
                      className="mt-4 text-sm font-medium text-cinematic-gold hover:underline"
                    >
                      View film →
                    </Link>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </section>
    </motion.div>
  );
}
