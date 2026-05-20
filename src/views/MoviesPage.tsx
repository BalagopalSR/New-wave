import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { VideoModal } from '../components/VideoModal/VideoModal';
import { useContent } from '../context/ContentContext';
import { filterAndSortMovies } from '../lib/movieUtils';
import { GENRES, type SortOption } from '../types/content';

const SORT_OPTIONS: SortOption[] = [
  'Latest',
  'Most Popular',
  'Highest Rated',
  'Award Winners',
];

const PAGE_SIZE = 8;

export function MoviesPage() {
  const { movies } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenre = searchParams.get('genre') ?? 'All';
  const initialQuery = searchParams.get('q') ?? '';

  const [search, setSearch] = useState(initialQuery);
  const [genre, setGenre] = useState(initialGenre);
  const [sort, setSort] = useState<SortOption>('Latest');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [video, setVideo] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const g = searchParams.get('genre');
    if (g) setGenre(g);
    const q = searchParams.get('q');
    if (q !== null) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('q', search.trim());
    if (genre !== 'All') params.set('genre', genre);
    if (params.toString() === searchParams.toString()) return;
    setSearchParams(params, { replace: true });
  }, [search, genre, searchParams, setSearchParams]);

  const filtered = useMemo(
    () => filterAndSortMovies(movies, { search, genre, sort }),
    [movies, search, genre, sort],
  );

  const displayed = filtered.slice(0, visible);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="hero-banner relative flex min-h-[40vh] items-end pt-20">
        <img
          src="https://image.tmdb.org/t/p/w1280/hkBaDgkMJADeWqpcriKyaoDHQXx.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-banner-overlay absolute inset-0 bg-black/70" />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">Catalog</p>
          <h1 className="mt-2 font-display text-4xl text-cinematic-ivory md:text-5xl">
            Explore Movies
          </h1>
          <p className="mt-4 max-w-2xl text-cinematic-muted">
            Discover premieres, trending titles, award winners, and cinematic stories from around
            the world.
          </p>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cinematic-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search movies, directors, cast..."
              className="w-full rounded-full border border-white/15 bg-cinematic-surface py-3 pl-12 pr-4 focus:border-cinematic-gold focus:outline-none"
              aria-label="Search movies"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOption);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-full border border-white/15 bg-cinematic-surface px-4 py-3 text-sm focus:border-cinematic-gold focus:outline-none"
            aria-label="Sort movies"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                setGenre(g);
                setVisible(PAGE_SIZE);
              }}
              className={`chip transition ${genre === g ? 'chip-active' : 'hover:border-white/30'}`}
            >
              {g}
            </button>
          ))}
        </div>

        {search.trim() && (
          <p className="mb-6 text-sm text-cinematic-muted">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
        )}

        {displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-white/10 bg-cinematic-surface py-20 text-center"
          >
            <h2 className="font-display text-2xl text-cinematic-ivory">No movies found</h2>
            <p className="mt-2 text-cinematic-muted">Try adjusting your search or filters.</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {displayed.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  variant="compact"
                  onPlayTrailer={(url, title) => setVideo({ url, title })}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {visible < filtered.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="btn-outline"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      <VideoModal
        isOpen={!!video}
        onClose={() => setVideo(null)}
        videoUrl={video?.url ?? ''}
        movieTitle={video?.title}
        clipTitle="Trailer"
      />
    </motion.div>
  );
}
