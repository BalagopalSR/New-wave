import { useEffect, useState } from 'react';
import {
  isDisplayableImageUrl,
  normalizeImageUrl,
  pickImageUrl,
  proxyImageUrl,
  toCurrentTmdbCdn,
} from '../../lib/imageUrl';

type CinematicImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Primary fallback if src fails */
  fallbackSrc?: string;
  /** Extra fallbacks tried in order */
  extraFallbacks?: string[];
  loading?: 'lazy' | 'eager';
};

type LoadStage = 'primary' | 'fallback' | 'proxy' | 'failed';

export function CinematicImage({
  src,
  alt,
  className = '',
  fallbackSrc,
  extraFallbacks = [],
  loading = 'lazy',
}: CinematicImageProps) {
  const primary = toCurrentTmdbCdn(normalizeImageUrl(src));
  const fallbacks = [
    toCurrentTmdbCdn(normalizeImageUrl(fallbackSrc)),
    ...extraFallbacks.map((u) => toCurrentTmdbCdn(normalizeImageUrl(u))),
  ].filter(isDisplayableImageUrl);

  const bestSrc = pickImageUrl(primary, ...fallbacks);

  const [stage, setStage] = useState<LoadStage>(
    isDisplayableImageUrl(bestSrc) ? 'primary' : 'failed',
  );
  const [current, setCurrent] = useState(bestSrc);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const next = pickImageUrl(primary, ...fallbacks);
    setCurrent(next);
    setStage(isDisplayableImageUrl(next) ? 'primary' : 'failed');
  }, [primary, fallbackSrc, extraFallbacks.join('|')]);

  const placeholder = (
    <div
      className={`bg-gradient-to-br from-cinematic-elevated to-cinematic-bg ${className}`}
      role="img"
      aria-label={alt}
    />
  );

  if (!mounted || stage === 'failed' || !current) {
    return placeholder;
  }

  const handleError = () => {
    if (stage === 'primary') {
      const next = fallbacks.find((f) => f && f !== current);
      if (next) {
        setCurrent(next);
        setStage('fallback');
        return;
      }
      if (primary.startsWith('http')) {
        setCurrent(proxyImageUrl(primary));
        setStage('proxy');
        return;
      }
    } else if (stage === 'fallback') {
      const remaining = fallbacks.filter((f) => f !== current);
      if (remaining[0]) {
        setCurrent(remaining[0]);
        return;
      }
      const base = pickImageUrl(primary, ...fallbacks);
      if (base.startsWith('http')) {
        setCurrent(proxyImageUrl(base));
        setStage('proxy');
        return;
      }
    }
    setStage('failed');
  };

  return (
    <img
      key={`${stage}-${current}`}
      src={current}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      className={className}
      onError={handleError}
    />
  );
}
