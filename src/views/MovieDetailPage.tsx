import { motion } from 'framer-motion';
import { Film, Play, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CastCard } from '../components/CastCard/CastCard';
import { LightboxGallery } from '../components/LightboxGallery/LightboxGallery';
import { MovieCarousel } from '../components/MovieCarousel/MovieCarousel';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { VideoModal } from '../components/VideoModal/VideoModal';
import { useContent } from '../context/ContentContext';
import { CinematicImage } from '../components/CinematicImage/CinematicImage';
import { getMovieById, getSimilarMovies } from '../lib/movieUtils';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { movies } = useContent();
  const movie = id ? getMovieById(movies, id) : undefined;
  const [video, setVideo] = useState<{
    url: string;
    clipTitle?: string;
    duration?: string;
  } | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20 text-center">
        <h1 className="font-display text-3xl text-cinematic-ivory">Film not found</h1>
        <Link to="/movies" className="btn-primary mt-6">
          Browse Movies
        </Link>
      </div>
    );
  }

  const similar = getSimilarMovies(movies, movie);

  const playTrailer = () => {
    if (!movie.trailerUrl?.trim()) return;
    setVideo({ url: movie.trailerUrl, clipTitle: 'Official Trailer' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative min-h-[70vh] pt-20">
        <CinematicImage
          src={movie.bannerImage}
          alt={`${movie.title} banner`}
          fallbackSrc={movie.posterImage}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-hero-vignette" />
        <div className="absolute inset-0 bg-hero-bottom" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:gap-12 lg:px-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 shrink-0 sm:w-56 lg:w-64"
          >
            <CinematicImage
              src={movie.posterImage}
              alt={`${movie.title} poster`}
              className="w-full rounded-2xl border border-white/15 shadow-card"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 text-center lg:text-left"
          >
            {movie.isAwardWinner && (
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cinematic-gold/20 px-3 py-1 text-xs uppercase tracking-wider text-cinematic-gold">
                <Trophy className="h-4 w-4" /> Award Winner
              </span>
            )}
            <p className="text-xs uppercase tracking-[0.25em] text-cinematic-gold">Featured Film</p>
            <h1 className="mt-2 font-display text-4xl text-cinematic-ivory md:text-5xl lg:text-6xl">
              {movie.title}
            </h1>
            <p className="mt-4 max-w-2xl text-cinematic-muted">{movie.description}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {movie.genre.map((g) => (
                <span key={g} className="chip">
                  {g}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-cinematic-muted">
              {movie.rating} · {movie.duration} · {movie.releaseDate} · {movie.language}
            </p>
            <p className="text-sm text-cinematic-muted">Directed by {movie.director}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <a
                href="#"
                className="btn-crimson"
                onClick={(e) => e.preventDefault()}
              >
                <Film className="h-5 w-5" />
                Play Movie
              </a>
              <button
                type="button"
                onClick={playTrailer}
                disabled={!movie.trailerUrl?.trim()}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="h-5 w-5 fill-current" />
                Play Trailer
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl text-cinematic-ivory">About the Movie</h2>
            <p className="mt-4 leading-relaxed text-cinematic-muted">{movie.synopsis}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-cinematic-gold">Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ['Director', movie.director],
                ['Production', movie.productionCompany],
                ['Country', movie.country],
                ['Language', movie.language],
                ['Release', movie.releaseDate],
                ['Duration', movie.duration],
                ['Genre', movie.genre.join(', ')],
                ['Rating', movie.rating],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                  <dt className="text-cinematic-muted">{label}</dt>
                  <dd className="text-right text-cinematic-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px] border-t border-white/5">
        <SectionHeader title="Movie Clips" subtitle="Trailers, teasers, and exclusive footage." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {movie.clips.map((clip) => (
            <button
              key={clip.title}
              type="button"
              onClick={() =>
                setVideo({
                  url: clip.videoUrl,
                  clipTitle: clip.title,
                  duration: clip.duration,
                })
              }
              className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 text-left"
            >
              <CinematicImage
                src={clip.thumbnail}
                alt={`${clip.title} thumbnail`}
                fallbackSrc={movie.posterImage}
                extraFallbacks={[movie.bannerImage]}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <Play className="h-10 w-10 fill-cinematic-gold text-cinematic-gold" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-card-fade p-3">
                <span className="text-[10px] uppercase tracking-wider text-cinematic-gold">
                  {clip.category}
                </span>
                <p className="text-sm font-medium">{clip.title}</p>
                <p className="text-xs text-cinematic-muted">{clip.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {movie.awards.length > 0 && (
        <section className="section-pad mx-auto max-w-[1440px]">
          <SectionHeader title="Awards" />
          <div className="grid gap-4 md:grid-cols-2">
            {movie.awards.map((award) => (
              <div
                key={award.title}
                className="rounded-2xl border border-cinematic-gold/20 bg-cinematic-surface p-6"
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs uppercase ${
                    award.status === 'Winner'
                      ? 'bg-cinematic-gold/20 text-cinematic-gold'
                      : 'bg-cinematic-bronze/20 text-cinematic-bronze'
                  }`}
                >
                  {award.status}
                </span>
                <h3 className="mt-3 font-display text-xl">{award.title}</h3>
                <p className="text-sm text-cinematic-gold">
                  {award.festival} · {award.year}
                </p>
                <p className="mt-2 text-sm text-cinematic-muted">{award.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-pad mx-auto max-w-[1440px]">
        <SectionHeader title="Cast & Crew" />
        <div className="flex gap-6 overflow-x-auto pb-4">
          {movie.cast.map((member, i) => (
            <CastCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-[1440px]">
        <SectionHeader title="Gallery" />
        <LightboxGallery items={movie.galleryImages} columns={3} />
      </section>

      {similar.length > 0 && (
        <section className="section-pad mx-auto max-w-[1440px] border-t border-white/5">
          <SectionHeader title="Similar Movies" subtitle="More films you might love." />
          <MovieCarousel
            movies={similar}
            onPlayTrailer={(url) => setVideo({ url, clipTitle: 'Trailer' })}
          />
        </section>
      )}

      <VideoModal
        isOpen={!!video}
        onClose={() => setVideo(null)}
        videoUrl={video?.url}
        movieTitle={movie.title}
        clipTitle={video?.clipTitle}
        duration={video?.duration}
      />
    </motion.div>
  );
}
