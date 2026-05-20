/** Reliable placeholder images (Picsum) — avoids broken Unsplash IDs */
export const poster = (seed: string) =>
  `https://picsum.photos/seed/cv-poster-${seed}/600/900`;

export const banner = (seed: string) =>
  `https://picsum.photos/seed/cv-banner-${seed}/1920/1080`;

export const still = (seed: string) =>
  `https://picsum.photos/seed/cv-still-${seed}/800/600`;

export const thumb = (seed: string) =>
  `https://picsum.photos/seed/cv-thumb-${seed}/640/360`;
