import type { Movie } from '../../types/content';

type MovieSelectorProps = {
  movies: Movie[];
  value: string;
  onChange: (movieId: string) => void;
  label?: string;
};

export function MovieSelector({ movies, value, onChange, label = 'Select movie' }: MovieSelectorProps) {
  return (
    <label className="block">
      <span className="text-sm text-cinematic-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full max-w-md rounded-xl border border-white/15 bg-cinematic-bg px-4 py-2.5 text-sm focus:border-cinematic-gold focus:outline-none"
      >
        <option value="">— Choose a movie —</option>
        {movies.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title} ({m.year})
          </option>
        ))}
      </select>
    </label>
  );
}
