import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { Movie } from '../../types/content';
import { CinematicImage } from '../CinematicImage/CinematicImage';

type HeroCarouselProps = {
  movies: Movie[];
  onPlayTrailer: (url: string, title: string) => void;
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function HeroCarousel({ movies, onPlayTrailer }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevClass = 'hero-swiper-prev';
  const nextClass = 'hero-swiper-next';

  return (
    <section className="hero-banner relative min-h-[90vh] w-full overflow-hidden pt-20">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
        pagination={{ clickable: true, dynamicBullets: false }}
        loop
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="hero-swiper h-[calc(90vh-5rem)] min-h-[520px]"
      >
        {movies.map((movie, slideIndex) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: slideIndex === activeIndex ? 1.06 : 1 }}
                transition={{ duration: 8, ease: 'linear' }}
              >
                <CinematicImage
                  src={movie.bannerImage}
                  alt={`${movie.title} banner`}
                  fallbackSrc={movie.posterImage}
                  loading={slideIndex === activeIndex ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-hero-vignette" />
              <div className="absolute inset-0 bg-hero-bottom" />

              <div className="relative mx-auto flex h-full max-w-[1440px] flex-col items-center gap-8 px-4 pb-16 pt-8 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:pb-24">
                <AnimatePresence mode="wait">
                  {slideIndex === activeIndex && (
                    <motion.div
                      key={movie.id}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex-1 text-center lg:text-left"
                    >
                      <motion.p
                        custom={0}
                        variants={textVariants}
                        className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-cinematic-gold"
                      >
                        Now Showing
                      </motion.p>
                      <motion.div className="mb-1 h-0.5 w-12 bg-cinematic-gold lg:mb-4" custom={0} variants={textVariants} />
                      <motion.h1
                        custom={1}
                        variants={textVariants}
                        className="font-display text-3xl font-bold leading-tight text-cinematic-ivory sm:text-5xl lg:text-6xl xl:text-7xl"
                      >
                        {movie.title}
                      </motion.h1>
                      <motion.p
                        custom={2}
                        variants={textVariants}
                        className="mt-4 max-w-xl text-base text-cinematic-muted md:text-lg"
                      >
                        {movie.description}
                      </motion.p>
                      <motion.div custom={3} variants={textVariants} className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                        {movie.genre.map((g, i) => (
                          <motion.span
                            key={g}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="chip"
                          >
                            {g}
                          </motion.span>
                        ))}
                      </motion.div>
                      <motion.div
                        custom={4}
                        variants={textVariants}
                        className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-cinematic-muted lg:justify-start"
                      >
                        <span>{movie.year}</span>
                        <span>·</span>
                        <span>{movie.duration}</span>
                        <span className="rounded-full border border-cinematic-gold/50 bg-cinematic-gold/10 px-3 py-0.5 text-cinematic-gold">
                          {movie.rating}
                        </span>
                      </motion.div>
                      <motion.div
                        custom={5}
                        variants={textVariants}
                        className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:max-w-none lg:justify-start"
                      >
                        <button
                          type="button"
                          onClick={() => onPlayTrailer(movie.trailerUrl, movie.title)}
                          className="btn-primary w-full sm:w-auto"
                        >
                          <Play className="h-5 w-5 fill-current" />
                          Play Trailer
                        </button>
                        <Link
                          to={`/movies/${movie.id}`}
                          className="btn-outline w-full text-center sm:w-auto"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="hidden shrink-0 lg:block"
                >
                  <CinematicImage
                    src={movie.posterImage}
                    alt={`${movie.title} poster`}
                    className="w-56 rounded-2xl border border-white/10 shadow-card xl:w-64"
                  />
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={`${prevClass} absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition hover:border-cinematic-gold sm:left-4 sm:h-12 sm:w-12 lg:left-8`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        className={`${nextClass} absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition hover:border-cinematic-gold sm:right-4 sm:h-12 sm:w-12 lg:right-8`}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
