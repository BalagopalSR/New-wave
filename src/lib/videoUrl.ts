/** Normalize YouTube links to embed URLs so they work inside iframes. */
export function toYouTubeEmbedUrl(url: string): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;

  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`;

  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const vMatch = trimmed.match(/youtube\.com\/v\/([a-zA-Z0-9_-]{11})/);
  if (vMatch) return `https://www.youtube.com/embed/${vMatch[1]}`;

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  return null;
}

export function repairVideoUrl(url: string | undefined): string {
  if (!url?.trim()) return '';
  const embed = toYouTubeEmbedUrl(url);
  return embed ?? url.trim();
}

export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export function buildEmbedPlayerSrc(embedUrl: string): string {
  const separator = embedUrl.includes('?') ? '&' : '?';
  return `${embedUrl}${separator}autoplay=1&rel=0&modestbranding=1`;
}
