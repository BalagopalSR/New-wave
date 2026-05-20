import { Plus, Trash2 } from 'lucide-react';
import type { Movie } from '../types/content';
import { ImageField } from '../components/admin/ImageField';

export const adminInputClass =
  'mt-1 w-full rounded-xl border border-white/15 bg-cinematic-bg px-4 py-2.5 text-sm focus:border-cinematic-gold focus:outline-none';

const CLIP_CATEGORIES = ['Trailer', 'Teaser', 'Interview', 'Behind the Scenes'] as const;

export function ClipsEditor({
  clips,
  posterFallback,
  bannerFallback,
  onChange,
}: {
  clips: Movie['clips'];
  posterFallback: string;
  bannerFallback: string;
  onChange: (clips: Movie['clips']) => void;
}) {
  const updateClip = (index: number, patch: Partial<Movie['clips'][0]>) => {
    onChange(clips.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };

  const remove = (index: number) => onChange(clips.filter((_, i) => i !== index));

  const add = () =>
    onChange([
      ...clips,
      { title: '', category: 'Trailer', duration: '2:00', thumbnail: '', videoUrl: '' },
    ]);

  return (
    <div className="space-y-4">
      {clips.length === 0 && (
        <p className="text-sm text-cinematic-muted">No clips yet. Add a trailer or behind-the-scenes clip.</p>
      )}
      {clips.map((clip, index) => (
        <div key={index} className="rounded-xl border border-white/10 bg-cinematic-bg/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-cinematic-muted">
              Clip {index + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex items-center gap-1 text-xs text-cinematic-crimson hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-sm text-cinematic-muted">Title</span>
              <input
                value={clip.title}
                onChange={(e) => updateClip(index, { title: e.target.value })}
                className={adminInputClass}
              />
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Category</span>
              <select
                value={clip.category}
                onChange={(e) =>
                  updateClip(index, { category: e.target.value as Movie['clips'][0]['category'] })
                }
                className={adminInputClass}
              >
                {CLIP_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Duration</span>
              <input
                value={clip.duration}
                onChange={(e) => updateClip(index, { duration: e.target.value })}
                className={adminInputClass}
                placeholder="2:30"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm text-cinematic-muted">Video URL (YouTube embed)</span>
              <input
                value={clip.videoUrl}
                onChange={(e) => updateClip(index, { videoUrl: e.target.value })}
                className={adminInputClass}
                placeholder="https://www.youtube.com/embed/..."
              />
            </label>
          </div>
          <div className="mt-4">
            <ImageField
              label="Thumbnail (optional — uses banner/poster if empty)"
              value={clip.thumbnail}
              onChange={(url) => updateClip(index, { thumbnail: url })}
            />
            {!clip.thumbnail && (posterFallback || bannerFallback) && (
              <p className="mt-1 text-xs text-cinematic-muted">
                Will fall back to movie banner or poster on the site.
              </p>
            )}
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-outline py-2 text-sm">
        <Plus className="h-4 w-4" /> Add clip
      </button>
    </div>
  );
}

export function AwardsEditor({
  awards,
  onChange,
}: {
  awards: Movie['awards'];
  onChange: (awards: Movie['awards']) => void;
}) {
  const updateAward = (index: number, patch: Partial<Movie['awards'][0]>) => {
    onChange(awards.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  };

  return (
    <div className="space-y-4">
      {awards.map((award, index) => (
        <div key={index} className="rounded-xl border border-white/10 bg-cinematic-bg/50 p-4">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => onChange(awards.filter((_, i) => i !== index))}
              className="text-xs text-cinematic-crimson hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5 inline" /> Remove
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-sm text-cinematic-muted">Award title</span>
              <input
                value={award.title}
                onChange={(e) => updateAward(index, { title: e.target.value })}
                className={adminInputClass}
              />
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Festival</span>
              <input
                value={award.festival}
                onChange={(e) => updateAward(index, { festival: e.target.value })}
                className={adminInputClass}
              />
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Year</span>
              <input
                type="number"
                value={award.year}
                onChange={(e) => updateAward(index, { year: Number(e.target.value) })}
                className={adminInputClass}
              />
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Status</span>
              <select
                value={award.status}
                onChange={(e) =>
                  updateAward(index, { status: e.target.value as 'Winner' | 'Nominated' })
                }
                className={adminInputClass}
              >
                <option value="Winner">Winner</option>
                <option value="Nominated">Nominated</option>
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm text-cinematic-muted">Description</span>
              <textarea
                rows={2}
                value={award.description}
                onChange={(e) => updateAward(index, { description: e.target.value })}
                className={adminInputClass}
              />
            </label>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...awards,
            {
              title: '',
              festival: '',
              year: new Date().getFullYear(),
              status: 'Nominated',
              description: '',
            },
          ])
        }
        className="btn-outline py-2 text-sm"
      >
        <Plus className="h-4 w-4" /> Add award
      </button>
    </div>
  );
}

export function CastEditor({
  cast,
  onChange,
}: {
  cast: Movie['cast'];
  onChange: (cast: Movie['cast']) => void;
}) {
  const updateMember = (index: number, patch: Partial<Movie['cast'][0]>) => {
    onChange(cast.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };

  return (
    <div className="space-y-4 grid gap-6 sm:grid-cols-2">
      {cast.map((member, index) => (
        <div key={index} className="rounded-xl border border-white/10 bg-cinematic-bg/50 p-4">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => onChange(cast.filter((_, i) => i !== index))}
              className="text-xs text-cinematic-crimson hover:underline"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-1">
            <label>
              <span className="text-sm text-cinematic-muted">Name</span>
              <input
                value={member.name}
                onChange={(e) => updateMember(index, { name: e.target.value })}
                className={adminInputClass}
              />
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Role</span>
              <input
                value={member.role}
                onChange={(e) => updateMember(index, { role: e.target.value })}
                className={adminInputClass}
                placeholder="Actor"
              />
            </label>
            <label>
              <span className="text-sm text-cinematic-muted">Character</span>
              <input
                value={member.character ?? ''}
                onChange={(e) => updateMember(index, { character: e.target.value })}
                className={adminInputClass}
              />
            </label>
          </div>
          <div className="mt-4">
            <ImageField
              label="Headshot"
              value={member.image}
              onChange={(url) => updateMember(index, { image: url })}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...cast, { name: '', role: 'Actor', character: '', image: '' }])
        }
        className="btn-outline py-2 text-sm"
      >
        <Plus className="h-4 w-4" /> Add cast member
      </button>
    </div>
  );
}

export function GalleryEditor({
  items,
  onChange,
}: {
  items: Movie['galleryImages'];
  onChange: (items: Movie['galleryImages']) => void;
}) {
  const updateItem = (index: number, patch: Partial<Movie['galleryImages'][0]>) => {
    onChange(items.map((g, i) => (i === index ? { ...g, ...patch } : g)));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-white/10 bg-cinematic-bg/50 p-4">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="text-xs text-cinematic-crimson hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5 inline" /> Remove
            </button>
          </div>
          <ImageField
            label="Image"
            value={item.image}
            onChange={(url) => updateItem(index, { image: url })}
          />
          <label className="mt-4 block">
            <span className="text-sm text-cinematic-muted">Caption</span>
            <input
              value={item.caption}
              onChange={(e) => updateItem(index, { caption: e.target.value })}
              className={adminInputClass}
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { image: '', caption: '' }])}
        className="btn-outline py-2 text-sm"
      >
        <Plus className="h-4 w-4" /> Add gallery image
      </button>
    </div>
  );
}
