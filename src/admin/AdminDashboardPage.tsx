import { Link } from 'react-router-dom';
import { Clapperboard, Film, Image, Images } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function AdminDashboardPage() {
  const { movies, banners } = useContent();

  return (
    <div>
      <h1 className="font-display text-3xl text-cinematic-ivory">Dashboard</h1>
      <p className="mt-2 text-cinematic-muted">Overview of your New Wave content.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
          <Film className="h-8 w-8 text-cinematic-gold" />
          <p className="mt-4 text-3xl font-semibold">{movies.length}</p>
          <p className="text-sm text-cinematic-muted">Movies in catalog</p>
          <Link to="/admin/movies" className="mt-4 inline-block text-sm text-cinematic-gold hover:underline">
            Manage movies →
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
          <Clapperboard className="h-8 w-8 text-cinematic-gold" />
          <p className="mt-4 text-3xl font-semibold">
            {movies.reduce((n, m) => n + m.clips.length, 0)}
          </p>
          <p className="text-sm text-cinematic-muted">Trailers &amp; clips</p>
          <Link to="/admin/clips" className="mt-4 inline-block text-sm text-cinematic-gold hover:underline">
            Manage clips →
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
          <Images className="h-8 w-8 text-cinematic-gold" />
          <p className="mt-4 text-3xl font-semibold">
            {movies.reduce((n, m) => n + m.galleryImages.length, 0)}
          </p>
          <p className="text-sm text-cinematic-muted">Gallery images</p>
          <Link to="/admin/gallery" className="mt-4 inline-block text-sm text-cinematic-gold hover:underline">
            Manage gallery →
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-6">
          <Image className="h-8 w-8 text-cinematic-gold" />
          <p className="mt-4 text-3xl font-semibold">
            {banners.filter((b) => b.enabled).length}
          </p>
          <p className="text-sm text-cinematic-muted">Active hero slides</p>
          <Link to="/admin/banners" className="mt-4 inline-block text-sm text-cinematic-gold hover:underline">
            Manage banners →
          </Link>
        </div>
      </div>

      {/* <div className="mt-10 rounded-2xl border border-cinematic-crimson/30 bg-cinematic-crimson/5 p-6">
        <h2 className="font-medium text-cinematic-ivory">Reset content</h2>
        <p className="mt-2 text-sm text-cinematic-muted">
          Restore default popular movies and banner configuration. This cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all content to defaults?')) resetToDefaults();
          }}
          className="btn-outline mt-4 border-cinematic-crimson/50 text-cinematic-crimson"
        >
          <RotateCcw className="h-4 w-4" /> Reset to defaults
        </button>
      </div> */}
    </div>
  );
}
