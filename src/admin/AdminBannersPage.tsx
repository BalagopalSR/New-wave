import { Plus, Trash2, GripVertical } from 'lucide-react';
import { ImageField } from '../components/admin/ImageField';
import { useContent } from '../context/ContentContext';
import type { HeroBanner } from '../types/content';
import { normalizeImageUrl } from '../lib/imageUrl';

export function AdminBannersPage() {
  const { movies, banners, addBanner, updateBanner, deleteBanner, setBanners } = useContent();

  const sorted = [...banners].sort((a, b) => a.order - b.order);

  const addNew = () => {
    const firstId = movies[0]?.id ?? '';
    addBanner({
      id: `banner-${crypto.randomUUID()}`,
      movieId: firstId,
      enabled: true,
      order: banners.length,
    });
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...sorted];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setBanners(next.map((b, i) => ({ ...b, order: i })));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-cinematic-ivory">Hero banners</h1>
          <p className="mt-2 text-cinematic-muted">
            Control homepage carousel slides. Link each slide to a movie and optionally override text or images.
          </p>
        </div>
        <button type="button" onClick={addNew} className="btn-primary" disabled={!movies.length}>
          <Plus className="h-5 w-5" /> Add slide
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {sorted.map((banner, index) => {
          const movie = movies.find((m) => m.id === banner.movieId);
          return (
            <BannerEditor
              key={banner.id}
              banner={banner}
              movies={movies}
              movieTitle={movie?.title ?? 'Unknown'}
              previewImage={banner.customBackgroundImage || movie?.bannerImage}
              onChange={updateBanner}
              onDelete={() => {
                if (window.confirm('Remove this banner slide?')) deleteBanner(banner.id);
              }}
              onMoveUp={() => move(index, -1)}
              onMoveDown={() => move(index, 1)}
              canMoveUp={index > 0}
              canMoveDown={index < sorted.length - 1}
            />
          );
        })}
        {sorted.length === 0 && (
          <p className="rounded-2xl border border-white/10 p-8 text-center text-cinematic-muted">
            No banners yet. Add a slide to populate the hero carousel.
          </p>
        )}
      </div>
    </div>
  );
}

type BannerEditorProps = {
  banner: HeroBanner;
  movies: { id: string; title: string }[];
  movieTitle: string;
  previewImage?: string;
  onChange: (b: HeroBanner) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

function BannerEditor({
  banner,
  movies,
  movieTitle,
  previewImage,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: BannerEditorProps) {
  const inputClass =
    'mt-1 w-full rounded-xl border border-white/15 bg-cinematic-bg px-3 py-2 text-sm focus:border-cinematic-gold focus:outline-none';

  return (
    <div className="rounded-2xl border border-white/10 bg-cinematic-surface p-4 lg:p-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={!canMoveUp}
            onClick={onMoveUp}
            className="rounded border border-white/10 p-1 disabled:opacity-30"
            aria-label="Move up"
          >
            <GripVertical className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            disabled={!canMoveDown}
            onClick={onMoveDown}
            className="rounded border border-white/10 p-1 disabled:opacity-30"
            aria-label="Move down"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </div>
        {previewImage && (
          <img
            src={normalizeImageUrl(previewImage)}
            alt=""
            referrerPolicy="no-referrer"
            className="h-24 w-40 rounded-lg object-cover"
          />
        )}
        <div className="min-w-0 flex-1 grid gap-3 sm:grid-cols-2">
          <label>
            <span className="text-xs text-cinematic-muted">Linked movie</span>
            <select
              value={banner.movieId}
              onChange={(e) => onChange({ ...banner, movieId: e.target.value })}
              className={inputClass}
            >
              {movies.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-end gap-2 pb-2">
            <input
              type="checkbox"
              checked={banner.enabled}
              onChange={(e) => onChange({ ...banner, enabled: e.target.checked })}
            />
            <span className="text-sm">Enabled on homepage</span>
          </label>
          <label className="sm:col-span-2">
            <span className="text-xs text-cinematic-muted">Custom title (optional)</span>
            <input
              value={banner.customTitle ?? ''}
              onChange={(e) => onChange({ ...banner, customTitle: e.target.value || undefined })}
              placeholder={movieTitle}
              className={inputClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-xs text-cinematic-muted">Custom description (optional)</span>
            <textarea
              rows={2}
              value={banner.customDescription ?? ''}
              onChange={(e) =>
                onChange({ ...banner, customDescription: e.target.value || undefined })
              }
              className={inputClass}
            />
          </label>
          <div className="sm:col-span-2">
            <ImageField
              label="Custom hero background (overrides movie banner)"
              value={banner.customBackgroundImage ?? ''}
              onChange={(url) =>
                onChange({ ...banner, customBackgroundImage: url || undefined })
              }
              hint="Leave empty to use the linked movie's banner image."
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-cinematic-crimson hover:bg-cinematic-crimson/10"
          aria-label="Delete banner"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
