import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export type GalleryItem = {
  image: string;
  caption: string;
  movieTitle?: string;
};

type LightboxGalleryProps = {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
};

export function LightboxGallery({ items, columns = 3 }: LightboxGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, goPrev, goNext]);

  const colClass =
    columns === 2
      ? 'grid-cols-2 sm:grid-cols-2'
      : columns === 4
        ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <>
      <div className={`grid gap-4 ${colClass}`}>
        {items.map((item, i) => (
          <motion.button
            key={`${item.image}-${i}`}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-gold"
          >
            <img
              src={item.image}
              alt={item.caption}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition group-hover:opacity-90" />
            <p className="absolute bottom-0 left-0 right-0 p-4 text-sm text-cinematic-text">
              {item.caption}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-cinematic-gold"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="absolute left-4 top-4 text-sm text-cinematic-muted">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <motion.img
              key={items[index].image}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              src={items[index].image}
              alt={items[index].caption}
              className="max-h-[70vh] max-w-full rounded-lg object-contain"
            />
            <p className="mt-4 max-w-lg text-center text-cinematic-text">
              {items[index].caption}
              {items[index].movieTitle && (
                <span className="mt-1 block text-sm text-cinematic-gold">{items[index].movieTitle}</span>
              )}
            </p>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 hover:border-cinematic-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 hover:border-cinematic-gold"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
