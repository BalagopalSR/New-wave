import { useNavigate, useParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { createEmptyMovie, slugify } from '../lib/movieUtils';
import { MovieForm } from './MovieForm';
import type { Movie } from '../types/content';

export function AdminMovieFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, addMovie, updateMovie } = useContent();
  // `/admin/movies/new` has no :id param; `/admin/movies/:id/edit` does.
  const isNew = !id || id === 'new';
  const existing = !isNew ? movies.find((m) => m.id === id) : undefined;

  if (!isNew && !existing) {
    return (
      <p className="text-cinematic-muted">
        Movie not found.{' '}
        <button type="button" onClick={() => navigate('/admin/movies')} className="text-cinematic-gold">
          Back to list
        </button>
      </p>
    );
  }

  const initial = existing ?? {
    ...createEmptyMovie(),
    id: slugify('new-movie-' + Date.now()),
  };

  const handleSubmit = (movie: Movie) => {
    if (isNew) {
      addMovie({ ...movie, id: movie.id || slugify(movie.title) });
    } else {
      updateMovie(movie);
    }
    navigate('/admin/movies');
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-cinematic-ivory">
        {isNew ? 'Add movie' : `Edit: ${existing?.title}`}
      </h1>
      <div className="mt-8 max-w-4xl">
        <MovieForm
          initial={initial}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/movies')}
        />
      </div>
    </div>
  );
}
