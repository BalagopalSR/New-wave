import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel';
import { MovieCarousel } from '../components/MovieCarousel/MovieCarousel';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { AwardCard } from '../components/AwardCard/AwardCard';
import { VideoModal } from '../components/VideoModal/VideoModal';
import { LightboxGallery } from '../components/LightboxGallery/LightboxGallery';
import { CinematicImage } from '../components/CinematicImage/CinematicImage';
import { useContent } from '../context/ContentContext';
import {
  getLatestMovies,
  getTrendingMovies,
  getShowcaseAwards,
  getAllClips,
  getGalleryImages,
} from '../lib/movieUtils';

export function HomePage() {
  const { movies, getHeroMovies } = useContent();
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const [video, setVideo] = useState<{
    url: string;
    movieTitle?: string;
    clipTitle?: string;
    duration?: string;
  } | null>(null);

  const heroMovies = getHeroMovies();
  const clips = getAllClips(movies).slice(0, 8);

  useEffect(() => {
    const id = window.setTimeout(() => setShowDeferredSections(true), 250);
    return () => window.clearTimeout(id);
  }, []);

  const openTrailer = (url: string, title: string) => {
    setVideo({ url, movieTitle: title, clipTitle: 'Official Trailer' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-hidden"
    >
      <HeroCarousel movies={heroMovies} onPlayTrailer={openTrailer} />

      <section className="section-pad mx-auto max-w-[1440px] overflow-hidden">
        <SectionHeader
          label="Newly Released"
          title="Latest Movies"
          subtitle="Fresh premieres and festival favorites hitting screens now."
          action={
            <Link to="/movies" className="btn-outline text-sm">
              View All
            </Link>
          }
        />
        <MovieCarousel movies={getLatestMovies(movies)} onPlayTrailer={openTrailer} />
      </section>

      {showDeferredSections ? (
        <>
          <section
            id="trending"
            className="section-pad mx-auto max-w-[1440px] overflow-hidden bg-cinematic-surfaceSoft/50"
          >
            <SectionHeader
              label="Hot Right Now"
              title="Trending Now"
              subtitle="The films everyone is talking about this week."
            />
            <MovieCarousel
              movies={getTrendingMovies(movies)}
              variant="trending"
              onPlayTrailer={openTrailer}
            />
          </section>

          <section id="awards" className="section-pad mx-auto max-w-[1440px]">
            <SectionHeader
              label="Red Carpet"
              title="Award-Winning Stories"
              subtitle="Celebrating excellence in cinema from festivals around the world."
              action={
                <Link to="/awards" className="btn-outline text-sm">
                  View All Awards
                </Link>
              }
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {getShowcaseAwards(movies).map((item, i) => (
                <AwardCard key={`${item.movieId}-${item.award.title}`} item={item} index={i} />
              ))}
            </div>
          </section>

          <section className="section-pad mx-auto max-w-[1440px]">
            <SectionHeader
              label="Watch Now"
              title="Trailers & Exclusive Clips"
              subtitle="Teasers, interviews, and behind-the-scenes moments."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {clips.map((clip, i) => (
                <motion.button
                  key={`${clip.movieId}-${clip.title}`}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() =>
                    setVideo({
                      url: clip.videoUrl,
                      movieTitle: clip.movieTitle,
                      clipTitle: clip.title,
                      duration: clip.duration,
                    })
                  }
                  className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-gold"
                >
                  <CinematicImage
                    src={clip.thumbnail}
                    alt={`${clip.title} thumbnail`}
                    fallbackSrc={clip.posterFallback}
                    extraFallbacks={[clip.bannerFallback]}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/55" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cinematic-gold/90 text-cinematic-bg animate-pulse-play">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="chip text-[10px]">{clip.category}</span>
                    <p className="mt-2 font-medium text-cinematic-ivory">{clip.title}</p>
                    <p className="text-xs text-cinematic-muted">
                      {clip.movieTitle} · {clip.duration}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          <section id="gallery" className="section-pad mx-auto max-w-[1440px]">
            <SectionHeader
              label="Exclusive"
              title="Behind the Scenes Gallery"
              subtitle="Premieres, sets, red carpets, and unforgettable moments."
              action={
                <Link to="/gallery" className="btn-outline text-sm">
                  View Full Gallery
                </Link>
              }
            />
            <LightboxGallery items={getGalleryImages(movies).slice(0, 8)} columns={3} />
          </section>
        </>
      ) : null}

      <VideoModal
        isOpen={!!video}
        onClose={() => setVideo(null)}
        videoUrl={video?.url ?? ''}
        movieTitle={video?.movieTitle}
        clipTitle={video?.clipTitle}
        duration={video?.duration}
      />
    </motion.div>
  );
}
