import { useState } from 'react';
import type { Movie } from '../types/content';
import { FormSection } from '../components/admin/FormSection';
import { ImageField } from '../components/admin/ImageField';
import { slugify } from '../lib/movieUtils';
import { normalizeImageUrl } from '../lib/imageUrl';
import {
  adminInputClass,
  AwardsEditor,
  CastEditor,
  ClipsEditor,
  GalleryEditor,
} from './movieEditors';

type MovieFormProps = {
  initial: Movie;
  onSubmit: (movie: Movie) => void;
  onCancel: () => void;
};

const inputClass = adminInputClass;

function normalizeMovie(movie: Movie, genre: string[]): Movie {
  return {
    ...movie,
    genre: genre.length ? genre : ['Drama'],
    slug: movie.slug || slugify(movie.title),
    posterImage: normalizeImageUrl(movie.posterImage),
    bannerImage: normalizeImageUrl(movie.bannerImage),
    cast: movie.cast.map((c) => ({ ...c, image: normalizeImageUrl(c.image) })),
    galleryImages: movie.galleryImages.map((g) => ({
      ...g,
      image: normalizeImageUrl(g.image),
    })),
    clips: movie.clips.map((c) => ({
      ...c,
      thumbnail: normalizeImageUrl(c.thumbnail),
    })),
  };
}

export function MovieForm({ initial, onSubmit, onCancel }: MovieFormProps) {
  const [movie, setMovie] = useState<Movie>(initial);
  const [genreInput, setGenreInput] = useState(movie.genre.join(', '));

  const update = <K extends keyof Movie>(key: K, value: Movie[K]) => {
    setMovie((m) => ({ ...m, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const genre = genreInput
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean);
    onSubmit(normalizeMovie(movie, genre));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection
        title="Hero header"
        detailPageLabel="Top banner, poster, title, tags, Play Movie / Play Trailer"
        subtitle="What visitors see at the top of the movie detail page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm text-cinematic-muted">Title *</span>
            <input
              required
              value={movie.title}
              onChange={(e) => update('title', e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm text-cinematic-muted">Short description (hero tagline)</span>
            <textarea
              rows={2}
              value={movie.description}
              onChange={(e) => update('description', e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm text-cinematic-muted">Genres (comma-separated)</span>
            <input value={genreInput} onChange={(e) => setGenreInput(e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Rating</span>
            <input value={movie.rating} onChange={(e) => update('rating', e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Duration</span>
            <input value={movie.duration} onChange={(e) => update('duration', e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Release date</span>
            <input
              value={movie.releaseDate}
              onChange={(e) => update('releaseDate', e.target.value)}
              className={inputClass}
              placeholder="July 16, 2010"
            />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Language</span>
            <input value={movie.language} onChange={(e) => update('language', e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Director</span>
            <input value={movie.director} onChange={(e) => update('director', e.target.value)} className={inputClass} />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Year</span>
            <input
              type="number"
              value={movie.year}
              onChange={(e) => update('year', Number(e.target.value))}
              className={inputClass}
            />
          </label>
        </div>
        <div className="mt-6 grid gap-6">
          <ImageField
            label="Poster image"
            value={movie.posterImage}
            onChange={(url) => update('posterImage', url)}
            hint="Shown beside the title on the detail page and on movie cards."
          />
          <ImageField
            label="Banner / backdrop image"
            value={movie.bannerImage}
            onChange={(url) => update('bannerImage', url)}
            hint="Full-width background behind the hero section."
          />
          <label className="block">
            <span className="text-sm text-cinematic-muted">Trailer URL (YouTube)</span>
            <input
              value={movie.trailerUrl}
              onChange={(e) => update('trailerUrl', e.target.value)}
              className={inputClass}
              placeholder="Paste watch or embed link — e.g. youtube.com/watch?v=..."
            />
          </label>
          <label className="block">
            <span className="text-sm text-cinematic-muted">Play movie URL (leave empty until ready)</span>
            <input
              value={movie.watchUrl}
              onChange={(e) => update('watchUrl', e.target.value)}
              className={inputClass}
              placeholder="Full movie link — added later is fine"
            />
          </label>
        </div>
      </FormSection>

      <FormSection
        title="About the movie"
        detailPageLabel="Synopsis section"
        subtitle="Long-form plot summary below the hero."
      >
        <label className="block">
          <span className="text-sm text-cinematic-muted">Synopsis</span>
          <textarea
            rows={5}
            value={movie.synopsis}
            onChange={(e) => update('synopsis', e.target.value)}
            className={inputClass}
          />
        </label>
      </FormSection>

      <FormSection
        title="Details sidebar"
        detailPageLabel="Details card (Director, Production, Country, etc.)"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="text-sm text-cinematic-muted">Production company</span>
            <input
              value={movie.productionCompany}
              onChange={(e) => update('productionCompany', e.target.value)}
              className={inputClass}
            />
          </label>
          <label>
            <span className="text-sm text-cinematic-muted">Country</span>
            <input value={movie.country} onChange={(e) => update('country', e.target.value)} className={inputClass} />
          </label>
        </div>
      </FormSection>

      <FormSection
        title="Movie clips"
        detailPageLabel="Movie Clips grid"
        subtitle="Also appears in homepage â€œTrailers & Exclusive Clipsâ€ when saved."
      >
        <ClipsEditor
          clips={movie.clips}
          posterFallback={movie.posterImage}
          bannerFallback={movie.bannerImage}
          onChange={(clips) => update('clips', clips)}
        />
      </FormSection>

      <FormSection title="Awards" detailPageLabel="Awards section (if any entries)">
        <AwardsEditor awards={movie.awards} onChange={(awards) => update('awards', awards)} />
      </FormSection>

      <FormSection title="Cast & crew" detailPageLabel="Cast carousel">
        <CastEditor cast={movie.cast} onChange={(cast) => update('cast', cast)} />
      </FormSection>

      <FormSection
        title="Gallery"
        detailPageLabel="Gallery lightbox"
        subtitle="Also feeds the homepage â€œBehind the Scenes Galleryâ€."
      >
        <GalleryEditor
          items={movie.galleryImages}
          onChange={(galleryImages) => update('galleryImages', galleryImages)}
        />
      </FormSection>

      <FormSection title="Homepage visibility">
        <div className="flex flex-wrap gap-6">
          {(
            [
              ['isLatest', 'Latest Movies carousel'],
              ['isTrending', 'Trending Now carousel'],
              ['isAwardWinner', 'Award winner badge on detail page'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!movie[key]}
                onChange={(e) => update(key, e.target.checked)}
                className="rounded border-white/20"
              />
              {label}
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <span className="text-cinematic-muted">Trending rank</span>
            <input
              type="number"
              min={1}
              value={movie.trendingRank ?? ''}
              onChange={(e) =>
                update('trendingRank', e.target.value ? Number(e.target.value) : undefined)
              }
              className="w-20 rounded-lg border border-white/15 bg-cinematic-bg px-2 py-1"
            />
          </label>
        </div>
      </FormSection>

      <div className="flex gap-3">
        <button type="submit" className="btn-primary">
          Save movie
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
