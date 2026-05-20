import { motion } from 'framer-motion';
import type { Movie } from '../../types/content';

type CastCardProps = {
  member: Movie['cast'][0];
  index?: number;
};

export function CastCard({ member, index = 0 }: CastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="w-36 shrink-0 md:w-40"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-cinematic-elevated">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
        />
      </div>
      <h4 className="mt-3 font-medium text-cinematic-text">{member.name}</h4>
      <p className="text-xs uppercase tracking-wider text-cinematic-muted">{member.role}</p>
      {member.character && (
        <p className="text-sm text-cinematic-gold">as {member.character}</p>
      )}
    </motion.div>
  );
}
