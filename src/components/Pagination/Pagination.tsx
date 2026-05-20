import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({ page, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;
  const visiblePages = showEllipsis
    ? pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    : pages;

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="flex h-10 min-w-10 items-center justify-center rounded-full border border-white/15 px-3 text-sm transition hover:border-cinematic-gold disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {visiblePages.map((p, i) => {
        const prev = visiblePages[i - 1];
        const showGap = showEllipsis && prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {showGap && <span className="px-1 text-cinematic-muted">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm transition ${
                p === page
                  ? 'border-cinematic-gold bg-cinematic-gold/15 text-cinematic-gold'
                  : 'border-white/15 hover:border-cinematic-gold'
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="flex h-10 min-w-10 items-center justify-center rounded-full border border-white/15 px-3 text-sm transition hover:border-cinematic-gold disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
