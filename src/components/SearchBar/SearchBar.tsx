import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  initialQuery?: string;
  autoFocus?: boolean;
};

export function SearchBar({
  className = '',
  placeholder = 'Search movies, directors, cast...',
  initialQuery = '',
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/movies?q=${encodeURIComponent(q)}` : '/movies');
  };

  return (
    <form onSubmit={submit} className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cinematic-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-full border border-white/15 bg-cinematic-surface py-3 pl-12 pr-4 text-cinematic-text focus:border-cinematic-gold focus:outline-none focus:ring-1 focus:ring-cinematic-gold"
        aria-label="Search movies"
      />
    </form>
  );
}
