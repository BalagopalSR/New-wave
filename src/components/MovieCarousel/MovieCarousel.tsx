import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Movie } from '../../types/content';
import { MovieCard } from '../MovieCard/MovieCard';
import { TrendingCard } from '../TrendingCard/TrendingCard';

type MovieCarouselProps = {
  movies: Movie[];
  variant?: 'poster' | 'trending';
  onPlayTrailer?: (url: string, title: string) => void;
};

export function MovieCarousel({
  movies,
  variant = 'poster',
  onPlayTrailer,
}: MovieCarouselProps) {
  const prevClass = `swiper-prev-${variant}`;
  const nextClass = `swiper-next-${variant}`;

  return (
    <div className="relative overflow-hidden">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          className={`${prevClass} flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-cinematic-gold hover:text-cinematic-gold`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={`${nextClass} flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-cinematic-gold hover:text-cinematic-gold`}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          480: { slidesPerView: variant === 'trending' ? 1.1 : 1.5 },
          640: { slidesPerView: variant === 'trending' ? 1.15 : 2.2 },
          1024: { slidesPerView: variant === 'trending' ? 2 : 3 },
          1280: { slidesPerView: variant === 'trending' ? 2.2 : 4 },
          1440: { slidesPerView: variant === 'trending' ? 2.5 : 5 },
        }}
        className="movie-carousel overflow-hidden"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="!h-auto min-w-0">
            {variant === 'trending' ? (
              <TrendingCard movie={movie} onPlayTrailer={onPlayTrailer} />
            ) : (
              <MovieCard movie={movie} onPlayTrailer={onPlayTrailer} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
