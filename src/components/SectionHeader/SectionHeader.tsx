import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionHeaderProps = {
  label?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
};

export function SectionHeader({
  label,
  title,
  subtitle,
  action,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between ${
        align === 'center' ? 'text-center md:text-center' : ''
      }`}
    >
      <motion.div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {label && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-cinematic-gold">
            {label}
          </p>
        )}
        <h2 className="font-display text-3xl font-semibold text-cinematic-ivory md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base text-cinematic-muted md:text-lg">{subtitle}</p>
        )}
      </motion.div>
      {action && <motion.div className="shrink-0">{action}</motion.div>}
    </motion.div>
  );
}
