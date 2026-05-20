import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { MovieSelector } from '../components/admin/MovieSelector';
import { ClipsEditor } from './movieEditors';
import { normalizeImageUrl } from '../lib/imageUrl';
import type { Movie } from '../types/content';

export function AdminClipsPage() {
  const { movies, updateMovie } = useContent();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('movie') ?? movies[0]?.id ?? '';

  const [movieId, setMovieId] = useState(initialId);
  const [clips, setClips] = useState<Movie['clips']>([]);
  const [saved, setSaved] = useState(false);

  const selected = movies.find((m) => m.id === movieId);

  useEffect(() => {
    const m = movies.find((x) => x.id === movieId);
    setClips(m?.clips ?? []);
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
    const normalized = clips.map((c) => ({
      ...c,
      thumbnail: normalizeImageUrl(c.thumbnail),
    }));
    updateMovie({ ...selected, clips: normalized });
    setSaved(true);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-cinematic-ivory">Trailers &amp; Clips</h1>
      <p className="mt-2 max-w-2xl text-cinematic-muted">
        Manage trailers, teasers, and exclusive clips. These appear on the movie detail page and in the
        homepage &quot;Trailers &amp; Exclusive Clips&quot; section.
      </p>

      <div className="mt-8 max-w-3xl space-y-6">
        <MovieSelector movies={movies} value={movieId} onChange={setMovieId} />

        {selected ? (
          <>
            <p className="text-sm text-cinematic-muted">
              Editing clips for <strong className="text-cinematic-ivory">{selected.title}</strong>.{' '}
              <Link to={`/admin/movies/${selected.id}/edit`} className="text-cinematic-gold hover:underline">
                Open full movie editor
              </Link>
            </p>
            <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
              <ClipsEditor
                clips={clips}
                posterFallback={selected.posterImage}
                bannerFallback={selected.bannerImage}
                onChange={setClips}
              />
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={save} className="btn-primary">
                Save clips
              </button>
              {saved && <span className="text-sm text-cinematic-gold">Clips saved.</span>}
            </div>
          </>
        ) : (
          <p className="text-sm text-cinematic-muted">Select a movie to manage its clips.</p>
        )}
      </div>
    </div>
  );
}
