import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function AdminMoviesPage() {
  const { movies, deleteMovie } = useContent();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-cinematic-ivory">Movies</h1>
          <p className="mt-2 text-cinematic-muted">Add, edit, or remove films from the catalog.</p>
        </div>
        <Link to="/admin/movies/new" className="btn-primary">
          <Plus className="h-5 w-5" /> Add movie
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-cinematic-surface text-cinematic-muted">
            <tr>
              <th className="p-4 font-medium">Poster</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Year</th>
              <th className="p-4 font-medium">Flags</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <img
                    src={m.posterImage}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-14 w-10 rounded object-cover"
                  />
                </td>
                <td className="p-4 font-medium text-cinematic-ivory">{m.title}</td>
                <td className="p-4 text-cinematic-muted">{m.year}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {m.isTrending && <span className="chip text-[10px]">Trending</span>}
                    {m.isLatest && <span className="chip text-[10px]">Latest</span>}
                    {m.isAwardWinner && <span className="chip text-[10px]">Award</span>}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/movies/${m.id}/edit`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 hover:border-cinematic-gold hover:text-cinematic-gold"
                      aria-label={`Edit ${m.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete "${m.title}"?`)) deleteMovie(m.id);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-cinematic-crimson hover:bg-cinematic-crimson/10"
                      aria-label={`Delete ${m.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
