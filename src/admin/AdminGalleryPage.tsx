import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { MovieSelector } from '../components/admin/MovieSelector';
import { GalleryEditor } from './movieEditors';
import { normalizeImageUrl } from '../lib/imageUrl';
import type { Movie } from '../types/content';

export function AdminGalleryPage() {
  const { movies, updateMovie } = useContent();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('movie') ?? movies[0]?.id ?? '';

  const [movieId, setMovieId] = useState(initialId);
  const [galleryImages, setGalleryImages] = useState<Movie['galleryImages']>([]);
  const [saved, setSaved] = useState(false);

  const selected = movies.find((m) => m.id === movieId);

  useEffect(() => {
    const m = movies.find((x) => x.id === movieId);
    setGalleryImages(m?.galleryImages ?? []);
    setSaved(false);
  }, [movieId, movies]);

  useEffect(() => {
    const fromUrl = searchParams.get('movie');
    if (fromUrl && movies.some((m) => m.id === fromUrl)) {
      setMovieId(fromUrl);
    }
  }, [searchParams, movies]);

  const save = () => {
    if (!selected) return;
    const normalized = galleryImages.map((g) => ({
      ...g,
      image: normalizeImageUrl(g.image),
    }));
    updateMovie({ ...selected, galleryImages: normalized });
    setSaved(true);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-cinematic-ivory">Gallery</h1>
      <p className="mt-2 max-w-2xl text-cinematic-muted">
        Manage behind-the-scenes images for each film. These appear on the movie detail page and in the
        homepage &quot;Behind the Scenes Gallery&quot; section.
      </p>

      <div className="mt-8 max-w-3xl space-y-6">
        <MovieSelector movies={movies} value={movieId} onChange={setMovieId} />

        {selected ? (
          <>
            <p className="text-sm text-cinematic-muted">
              Editing gallery for <strong className="text-cinematic-ivory">{selected.title}</strong>.{' '}
              <Link to={`/admin/movies/${selected.id}/edit`} className="text-cinematic-gold hover:underline">
                Open full movie editor
              </Link>
            </p>
            <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
              <GalleryEditor items={galleryImages} onChange={setGalleryImages} />
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={save} className="btn-primary">
                Save gallery
              </button>
              {saved && <span className="text-sm text-cinematic-gold">Gallery saved.</span>}
            </div>
          </>
        ) : (
          <p className="text-sm text-cinematic-muted">Select a movie to manage its gallery.</p>
        )}
      </div>
    </div>
  );
}
