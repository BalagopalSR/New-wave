import type { ReactNode } from 'react';

type FormSectionProps = {
  title: string;
  subtitle?: string;
  detailPageLabel?: string;
  children: ReactNode;
};

export function FormSection({ title, subtitle, detailPageLabel, children }: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
      <div className="border-b border-white/5 pb-4">
        {detailPageLabel && (
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cinematic-gold/80">
            On movie detail page: {detailPageLabel}
          </p>
        )}
        <h2 className="mt-1 text-sm font-medium uppercase tracking-wider text-cinematic-gold">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-cinematic-muted">{subtitle}</p>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
