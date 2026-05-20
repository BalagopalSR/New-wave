import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { LightboxGallery } from '../components/LightboxGallery/LightboxGallery';
import { Pagination } from '../components/Pagination/Pagination';
import { getGalleryImages } from '../lib/movieUtils';

const PAGE_SIZE = 12;

export function GalleryPage() {
  const { movies } = useContent();
  const items = getGalleryImages(movies);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  const handlePageChange = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-hidden">
      <section className="page-hero relative flex min-h-[36vh] items-end pt-20 sm:min-h-[40vh]">
        <div className="page-hero-bg page-hero-bg--gallery absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-10 pt-8 sm:px-6 sm:pb-12 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">Exclusive</p>
          <h1 className="mt-2 font-display text-3xl text-cinematic-ivory sm:text-4xl md:text-5xl">
            Behind the Scenes Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-cinematic-muted sm:text-base">
            Premieres, sets, red carpets, and unforgettable moments from our featured films.
            {items.length > 0 && (
              <span className="mt-1 block text-cinematic-gold">
                {items.length} photos · Page {page} of {totalPages}
              </span>
            )}
          </p>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        {items.length > 0 ? (
          <>
            <LightboxGallery items={pageItems} columns={3} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
            />
          </>
        ) : (
          <p className="text-center text-cinematic-muted">No gallery images yet.</p>
        )}
      </section>
    </motion.div>
  );
}
