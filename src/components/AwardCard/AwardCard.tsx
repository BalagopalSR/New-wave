import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ShowcaseAward } from '../../lib/movieUtils';

type AwardCardProps = {
  item: ShowcaseAward;
  index?: number;
};

export function AwardCard({ item, index = 0 }: AwardCardProps) {
  const isWinner = item.award.status === 'Winner';

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-cinematic-gold/30 bg-cinematic-surface p-6 shadow-glow transition hover:border-cinematic-gold/60 md:p-8"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cinematic-gold/10 blur-3xl" />
      <motion.div className="mb-4 flex items-center gap-3">
        {isWinner ? (
          <Trophy className="h-8 w-8 text-cinematic-gold" aria-hidden />
        ) : (
          <Award className="h-8 w-8 text-cinematic-bronze" aria-hidden />
        )}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
            isWinner
              ? 'bg-cinematic-gold/20 text-cinematic-gold'
              : 'bg-cinematic-bronze/20 text-cinematic-bronze'
          }`}
        >
          {item.award.status}
        </span>
      </motion.div>
      <p className="text-xs uppercase tracking-[0.2em] text-cinematic-muted">{item.award.festival}</p>
      <h3 className="mt-2 font-display text-2xl text-cinematic-ivory">{item.award.title}</h3>
      <p className="mt-1 text-sm text-cinematic-gold">{item.movieTitle}</p>
      <p className="mt-1 text-sm text-cinematic-muted">{item.award.year}</p>
      <p className="mt-4 text-sm leading-relaxed text-cinematic-muted">{item.award.description}</p>
      <Link
        to="/awards"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cinematic-gold transition hover:underline"
      >
        Explore Winners
      </Link>
    </motion.article>
  );
}
