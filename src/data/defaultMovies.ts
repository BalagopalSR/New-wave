import type { Movie } from '../types/content';
import { tmdbBackdrop, tmdbPoster } from './tmdb';
import { movieImages } from './tmdbAssets';

export function applyMovieImages(movie: Movie): Movie {
  const img = movieImages(movie.id);
  if (!img) return { ...movie, watchUrl: movie.watchUrl || movie.trailerUrl || '' };
  return {
    ...movie,
    posterImage: img.posterImage,
    bannerImage: img.bannerImage,
    galleryImages: movie.galleryImages.map((g, idx) => ({
      ...g,
      image:
        idx === 0
          ? img.bannerImage
          : idx === 1
            ? img.posterImage
            : g.image.includes('tmdb.org')
              ? img.bannerImage
              : g.image,
    })),
    clips: movie.clips.map((c) => ({
      ...c,
      thumbnail: img.bannerImage || img.posterImage,
    })),
  };
}

const castImg = (name: string) =>
  `https://i.pravatar.cc/400?img=${Math.abs(name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 70}`;

const yt = (id: string) => `https://www.youtube.com/embed/${id}`;

const rawDefaultMovies: Movie[] = [
  {
    id: 'inception',
    title: 'Inception',
    slug: 'inception',
    description:
      'A thief who steals secrets through dreams is offered a chance to plant an idea instead.',
    synopsis:
      'Dom Cobb is a skilled thief—the best in the dangerous art of extraction: stealing valuable secrets from deep within the subconscious during the dream state. Cobb is offered a chance at redemption if he can accomplish the impossible: inception, planting an idea rather than stealing one.',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    year: 2010,
    duration: '2h 28m',
    rating: 'PG-13',
    releaseDate: 'July 16, 2010',
    language: 'English',
    director: 'Christopher Nolan',
    productionCompany: 'Warner Bros. Pictures',
    country: 'United States',
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Actor', character: 'Cobb', image: castImg('Leonardo DiCaprio') },
      { name: 'Joseph Gordon-Levitt', role: 'Actor', character: 'Arthur', image: castImg('Joseph Gordon-Levitt') },
      { name: 'Ellen Page', role: 'Actor', character: 'Ariadne', image: castImg('Ellen Page') },
      { name: 'Tom Hardy', role: 'Actor', character: 'Eames', image: castImg('Tom Hardy') },
    ],
    posterImage: tmdbPoster('/9gk7adHYeDvHkCSEqAjQpHLd90T.jpg'),
    bannerImage: tmdbBackdrop('/s3TBrRGB1iav7gFOZNxX22L8OIC.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/s3TBrRGB1iav7gFOZNxX22L8OIC.jpg'), caption: 'Dream architecture sequence' },
      { image: tmdbPoster('/9gk7adHYeDvHkCSEqAjQpHLd90T.jpg'), caption: 'Official poster' },
    ],
    trailerUrl: yt('YoHD9XEInc0'),
    watchUrl: yt('YoHD9XEInc0'),
    clips: [
      { title: 'Official Trailer', category: 'Trailer', duration: '2:28', thumbnail: tmdbBackdrop('/s3TBrRGB1iav7gFOZNxX22L8OIC.jpg'), videoUrl: yt('YoHD9XEInc0') },
    ],
    awards: [
      { title: 'Best Cinematography', festival: 'Academy Awards', year: 2011, status: 'Winner', description: 'Wally Pfister for visionary dream-world photography.' },
      { title: 'Best Visual Effects', festival: 'Academy Awards', year: 2011, status: 'Winner', description: 'Groundbreaking practical and digital effects.' },
    ],
    isLatest: false,
    isTrending: true,
    trendingRank: 2,
    isAwardWinner: true,
  },
  {
    id: 'dark-knight',
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.',
    synopsis:
      'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. With the help of Lt. Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.',
    genre: ['Action', 'Drama', 'Thriller'],
    year: 2008,
    duration: '2h 32m',
    rating: 'PG-13',
    releaseDate: 'July 18, 2008',
    language: 'English',
    director: 'Christopher Nolan',
    productionCompany: 'Warner Bros. Pictures',
    country: 'United States',
    cast: [
      { name: 'Christian Bale', role: 'Actor', character: 'Bruce Wayne', image: castImg('Christian Bale') },
      { name: 'Heath Ledger', role: 'Actor', character: 'Joker', image: castImg('Heath Ledger') },
      { name: 'Aaron Eckhart', role: 'Actor', character: 'Harvey Dent', image: castImg('Aaron Eckhart') },
    ],
    posterImage: tmdbPoster('/qJ2tP7sWdRtNXvzHdj74bGjjY8F.jpg'),
    bannerImage: tmdbBackdrop('/hkBaDgkMJADeWqpcriKyaoDHQXx.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/hkBaDgkMJADeWqpcriKyaoDHQXx.jpg'), caption: 'Gotham city nights' },
    ],
    trailerUrl: yt('EXeTwQWrcwY'),
    watchUrl: yt('EXeTwQWrcwY'),
    clips: [
      { title: 'The Dark Knight — Trailer', category: 'Trailer', duration: '2:32', thumbnail: tmdbBackdrop('/hkBaDgkMJADeWqpcriKyaoDHQXx.jpg'), videoUrl: yt('EXeTwQWrcwY') },
    ],
    awards: [
      { title: 'Best Supporting Actor', festival: 'Academy Awards', year: 2009, status: 'Winner', description: 'Heath Ledger posthumous win as the Joker.' },
    ],
    isTrending: true,
    trendingRank: 1,
    isAwardWinner: true,
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    slug: 'interstellar',
    description: 'Explorers travel through a wormhole in space to ensure humanity’s survival.',
    synopsis:
      'In Earth’s future, a group of astronauts travel through a wormhole near Saturn in search of a new home for humanity as crops fail and civilization faces collapse. Cooper must leave behind his children to save the human race.',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    year: 2014,
    duration: '2h 49m',
    rating: 'PG-13',
    releaseDate: 'November 7, 2014',
    language: 'English',
    director: 'Christopher Nolan',
    productionCompany: 'Paramount Pictures',
    country: 'United States',
    cast: [
      { name: 'Matthew McConaughey', role: 'Actor', character: 'Cooper', image: castImg('Matthew McConaughey') },
      { name: 'Anne Hathaway', role: 'Actor', character: 'Brand', image: castImg('Anne Hathaway') },
      { name: 'Jessica Chastain', role: 'Actor', character: 'Murph', image: castImg('Jessica Chastain') },
    ],
    posterImage: tmdbPoster('/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
    bannerImage: tmdbBackdrop('/rAiY1HYzzuGkozjOp1cDGhHacXn.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/rAiY1HYzzuGkozjOp1cDGhHacXn.jpg'), caption: 'Beyond the wormhole' },
    ],
    trailerUrl: yt('zSWdZVtXT7E'),
    watchUrl: yt('zSWdZVtXT7E'),
    clips: [
      { title: 'Interstellar Trailer', category: 'Trailer', duration: '2:30', thumbnail: tmdbBackdrop('/rAiY1HYzzuGkozjOp1cDGhHacXn.jpg'), videoUrl: yt('zSWdZVtXT7E') },
    ],
    awards: [
      { title: 'Best Visual Effects', festival: 'Academy Awards', year: 2015, status: 'Winner', description: 'Award-winning depiction of black holes and space.' },
    ],
    isLatest: true,
    isTrending: true,
    trendingRank: 3,
    isAwardWinner: true,
  },
  {
    id: 'parasite',
    title: 'Parasite',
    slug: 'parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between two families.',
    synopsis:
      'All unemployed, the Kim family takes interest in the lavish lifestyle of the Parks. When their son Ki-woo begins tutoring the Park daughter, the Kims infiltrate the wealthy household one by one, until a shocking discovery exposes the hidden truth.',
    genre: ['Thriller', 'Drama', 'Comedy'],
    year: 2019,
    duration: '2h 12m',
    rating: 'R',
    releaseDate: 'November 8, 2019',
    language: 'Korean',
    director: 'Bong Joon-ho',
    productionCompany: 'CJ Entertainment',
    country: 'South Korea',
    cast: [
      { name: 'Song Kang-ho', role: 'Actor', character: 'Ki-taek', image: castImg('Song Kang-ho') },
      { name: 'Choi Woo-shik', role: 'Actor', character: 'Ki-woo', image: castImg('Choi Woo-shik') },
      { name: 'Park So-dam', role: 'Actor', character: 'Ki-jung', image: castImg('Park So-dam') },
    ],
    posterImage: tmdbPoster('/7IiTTgloJzvGI1TQAYYz4wyz91yy.jpg'),
    bannerImage: tmdbBackdrop('/TU9NgIU0xTZ7t7w5c0l4v9J2Z8H.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/TU9NgIU0xTZ7t7w5c0l4v9J2Z8H.jpg'), caption: 'The Park residence' },
    ],
    trailerUrl: yt('5xH0HfJHsaY'),
    watchUrl: yt('5xH0HfJHsaY'),
    clips: [
      { title: 'Parasite Trailer', category: 'Trailer', duration: '2:12', thumbnail: tmdbBackdrop('/TU9NgIU0xTZ7t7w5c0l4v9J2Z8H.jpg'), videoUrl: yt('5xH0HfJHsaY') },
    ],
    awards: [
      { title: 'Best Picture', festival: 'Academy Awards', year: 2020, status: 'Winner', description: 'First non-English language film to win Best Picture.' },
      { title: 'Palme d\'Or', festival: 'Cannes Film Festival', year: 2019, status: 'Winner', description: 'Historic unanimous jury prize.' },
    ],
    isTrending: true,
    trendingRank: 4,
    isAwardWinner: true,
  },
  {
    id: 'endgame',
    title: 'Avengers: Endgame',
    slug: 'avengers-endgame',
    description: 'The Avengers assemble once more to reverse Thanos’s snap and restore the universe.',
    synopsis:
      'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to undo Thanos’s actions and restore balance, risking everything in one final stand.',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    year: 2019,
    duration: '3h 01m',
    rating: 'PG-13',
    releaseDate: 'April 26, 2019',
    language: 'English',
    director: 'Anthony Russo, Joe Russo',
    productionCompany: 'Marvel Studios',
    country: 'United States',
    cast: [
      { name: 'Robert Downey Jr.', role: 'Actor', character: 'Tony Stark', image: castImg('Robert Downey Jr') },
      { name: 'Chris Evans', role: 'Actor', character: 'Steve Rogers', image: castImg('Chris Evans') },
      { name: 'Scarlett Johansson', role: 'Actor', character: 'Natasha Romanoff', image: castImg('Scarlett Johansson') },
    ],
    posterImage: tmdbPoster('/or1gDDENUyCkHZjDVFlf6QqFmQi.jpg'),
    bannerImage: tmdbBackdrop('/7RyHsO4yDXtBv0sjg92Ek0GOQNY.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/7RyHsO4yDXtBv0sjg92Ek0GOQNY.jpg'), caption: 'Final battle' },
    ],
    trailerUrl: yt('TcMB1CUgq0E'),
    watchUrl: yt('TcMB1CUgq0E'),
    clips: [
      { title: 'Endgame Trailer', category: 'Trailer', duration: '2:15', thumbnail: tmdbBackdrop('/7RyHsO4yDXtBv0sjg92Ek0GOQNY.jpg'), videoUrl: yt('TcMB1CUgq0E') },
    ],
    awards: [],
    isLatest: true,
    isTrending: true,
    trendingRank: 5,
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    slug: 'oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and the creation of the atomic bomb.',
    synopsis:
      'During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to lead the Manhattan Project, culminating in the development of the atomic bomb and forever changing the course of history.',
    genre: ['Drama', 'Thriller', 'History'],
    year: 2023,
    duration: '3h 00m',
    rating: 'R',
    releaseDate: 'July 21, 2023',
    language: 'English',
    director: 'Christopher Nolan',
    productionCompany: 'Universal Pictures',
    country: 'United States',
    cast: [
      { name: 'Cillian Murphy', role: 'Actor', character: 'J. Robert Oppenheimer', image: castImg('Cillian Murphy') },
      { name: 'Emily Blunt', role: 'Actor', character: 'Kitty Oppenheimer', image: castImg('Emily Blunt') },
      { name: 'Robert Downey Jr.', role: 'Actor', character: 'Lewis Strauss', image: castImg('Robert Downey Jr 2') },
    ],
    posterImage: tmdbPoster('/8Gxv8gSFCU0XGDykEGv7zR1n4zx.jpg'),
    bannerImage: tmdbBackdrop('/fm6Kq7nbNhMAq1zorjHx74icqmz.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/fm6Kq7nbNhMAq1zorjHx74icqmz.jpg'), caption: 'Trinity test' },
    ],
    trailerUrl: yt('uYPbbksJ6Ig'),
    watchUrl: yt('uYPbbksJ6Ig'),
    clips: [
      { title: 'Oppenheimer Trailer', category: 'Trailer', duration: '2:30', thumbnail: tmdbBackdrop('/fm6Kq7nbNhMAq1zorjHx74icqmz.jpg'), videoUrl: yt('uYPbbksJ6Ig') },
    ],
    awards: [
      { title: 'Best Picture', festival: 'Academy Awards', year: 2024, status: 'Winner', description: 'Sweeping seven Oscars including Best Director.' },
    ],
    isLatest: true,
    isTrending: true,
    trendingRank: 6,
    isAwardWinner: true,
  },
  {
    id: 'dune',
    title: 'Dune',
    slug: 'dune-2021',
    description: 'Paul Atreides leads nomadic tribes on the desert planet Arrakis against a galactic conspiracy.',
    synopsis:
      'Paul Atreides, a brilliant young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and people. As malevolent forces explode into conflict, only those who can conquer their fear will survive.',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    year: 2021,
    duration: '2h 35m',
    rating: 'PG-13',
    releaseDate: 'October 22, 2021',
    language: 'English',
    director: 'Denis Villeneuve',
    productionCompany: 'Legendary Pictures',
    country: 'United States',
    cast: [
      { name: 'Timothée Chalamet', role: 'Actor', character: 'Paul Atreides', image: castImg('Timothee Chalamet') },
      { name: 'Zendaya', role: 'Actor', character: 'Chani', image: castImg('Zendaya') },
      { name: 'Rebecca Ferguson', role: 'Actor', character: 'Lady Jessica', image: castImg('Rebecca Ferguson') },
    ],
    posterImage: tmdbPoster('/d5NX3itfYA1LQ8txJx3LlveYTkf.jpg'),
    bannerImage: tmdbBackdrop('/jYWXoONexkkmHMKKnl8kGkCmuXi.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/jYWXoONexkkmHMKKnl8kGkCmuXi.jpg'), caption: 'Arrakis desert' },
    ],
    trailerUrl: yt('8g18jAoF3c4'),
    watchUrl: yt('8g18jAoF3c4'),
    clips: [
      { title: 'Dune Official Trailer', category: 'Trailer', duration: '2:35', thumbnail: tmdbBackdrop('/jYWXoONexkkmHMKKnl8kGkCmuXi.jpg'), videoUrl: yt('8g18jAoF3c4') },
    ],
    awards: [
      { title: 'Best Sound', festival: 'Academy Awards', year: 2022, status: 'Winner', description: 'Immersive sound design for Arrakis.' },
    ],
    isLatest: true,
    isAwardWinner: true,
  },
  {
    id: 'everything-everywhere',
    title: 'Everything Everywhere All at Once',
    slug: 'everything-everywhere-all-at-once',
    description: 'A laundromat owner is swept into a multiverse adventure to save existence.',
    synopsis:
      'When an interdimensional rupture unravels reality, an unlikely hero—middle-aged Chinese immigrant Evelyn Wang—must channel skills from parallel lives to battle a bizarre threat and reconnect with her family.',
    genre: ['Action', 'Adventure', 'Comedy', 'Sci-Fi'],
    year: 2022,
    duration: '2h 19m',
    rating: 'R',
    releaseDate: 'March 25, 2022',
    language: 'English',
    director: 'Daniel Kwan, Daniel Scheinert',
    productionCompany: 'A24',
    country: 'United States',
    cast: [
      { name: 'Michelle Yeoh', role: 'Actor', character: 'Evelyn Wang', image: castImg('Michelle Yeoh') },
      { name: 'Stephanie Hsu', role: 'Actor', character: 'Joy Wang', image: castImg('Stephanie Hsu') },
      { name: 'Ke Huy Quan', role: 'Actor', character: 'Waymond Wang', image: castImg('Ke Huy Quan') },
    ],
    posterImage: tmdbPoster('/wAr0pT8tJpfcKoSIgxDtqph5RYF.jpg'),
    bannerImage: tmdbBackdrop('/emAh0waTYoljRXsARSGUZC1PBjT.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/emAh0waTYoljRXsARSGUZC1PBjT.jpg'), caption: 'Multiverse mayhem' },
    ],
    trailerUrl: yt('wxN1T1uxQ2g'),
    watchUrl: yt('wxN1T1uxQ2g'),
    clips: [
      { title: 'Official Trailer', category: 'Trailer', duration: '2:19', thumbnail: tmdbBackdrop('/emAh0waTYoljRXsARSGUZC1PBjT.jpg'), videoUrl: yt('wxN1T1uxQ2g') },
    ],
    awards: [
      { title: 'Best Picture', festival: 'Academy Awards', year: 2023, status: 'Winner', description: 'Seven Oscars including Best Actress for Michelle Yeoh.' },
    ],
    isTrending: true,
    trendingRank: 7,
    isAwardWinner: true,
  },
  {
    id: 'joker',
    title: 'Joker',
    slug: 'joker-2019',
    description: 'A failed comedian’s descent into madness sparks a revolution in Gotham City.',
    synopsis:
      'During the 1980s, a party clown and aspiring stand-up comedian Arthur Fleck is disregarded by society. His downward spiral leads him to embrace a life of crime and chaos, becoming the infamous Joker.',
    genre: ['Drama', 'Thriller', 'Crime'],
    year: 2019,
    duration: '2h 02m',
    rating: 'R',
    releaseDate: 'October 4, 2019',
    language: 'English',
    director: 'Todd Phillips',
    productionCompany: 'Warner Bros. Pictures',
    country: 'United States',
    cast: [
      { name: 'Joaquin Phoenix', role: 'Actor', character: 'Arthur Fleck', image: castImg('Joaquin Phoenix') },
      { name: 'Robert De Niro', role: 'Actor', character: 'Murray Franklin', image: castImg('Robert De Niro') },
    ],
    posterImage: tmdbPoster('/udDclJoHjfjb8Ekgsd4FDfOkK0U.jpg'),
    bannerImage: tmdbBackdrop('/n6lOvBKWLE9ntTAD6HBptB6hu8t.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/n6lOvBKWLE9ntTAD6HBptB6hu8t.jpg'), caption: 'Gotham streets' },
    ],
    trailerUrl: yt('zAGVQLHvwOY'),
    watchUrl: yt('zAGVQLHvwOY'),
    clips: [
      { title: 'Joker Trailer', category: 'Trailer', duration: '2:24', thumbnail: tmdbBackdrop('/n6lOvBKWLE9ntTAD6HBptB6hu8t.jpg'), videoUrl: yt('zAGVQLHvwOY') },
    ],
    awards: [
      { title: 'Best Actor', festival: 'Academy Awards', year: 2020, status: 'Winner', description: 'Joaquin Phoenix for his transformative performance.' },
    ],
    isAwardWinner: true,
  },
  {
    id: 'spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    slug: 'spider-man-across-the-spider-verse',
    description: 'Miles Morales catapults across the Multiverse to save every Spider society.',
    synopsis:
      'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    genre: ['Animation', 'Action', 'Adventure'],
    year: 2023,
    duration: '2h 20m',
    rating: 'PG',
    releaseDate: 'June 2, 2023',
    language: 'English',
    director: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
    productionCompany: 'Sony Pictures Animation',
    country: 'United States',
    cast: [
      { name: 'Shameik Moore', role: 'Actor', character: 'Miles Morales', image: castImg('Shameik Moore') },
      { name: 'Hailee Steinfeld', role: 'Actor', character: 'Gwen Stacy', image: castImg('Hailee Steinfeld') },
    ],
    posterImage: tmdbPoster('/8Vt6mWEReuy4yCxFklUAkCcJEVq.jpg'),
    bannerImage: tmdbBackdrop('/4HodYYWHNWP3jp0NHrvYzhIHlOR.jpg'),
    galleryImages: [
      { image: tmdbBackdrop('/4HodYYWHNWP3jp0NHrvYzhIHlOR.jpg'), caption: 'Spider-Society' },
    ],
    trailerUrl: yt('cqGjhVJWtF4'),
    watchUrl: yt('cqGjhVJWtF4'),
    clips: [
      { title: 'Across the Spider-Verse Trailer', category: 'Trailer', duration: '2:20', thumbnail: tmdbBackdrop('/4HodYYWHNWP3jp0NHrvYzhIHlOR.jpg'), videoUrl: yt('cqGjhVJWtF4') },
    ],
    awards: [
      { title: 'Best Animated Feature', festival: 'Golden Globes', year: 2024, status: 'Nominated', description: 'Critically acclaimed animation and storytelling.' },
    ],
    isLatest: true,
    isTrending: true,
    trendingRank: 8,
  },
];

export const defaultMovies: Movie[] = rawDefaultMovies.map(applyMovieImages);

export const defaultBanners = defaultMovies
  .filter((m) => m.isTrending)
  .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
  .slice(0, 5)
  .map((m, i) => ({
    id: `banner-${m.id}`,
    movieId: m.id,
    enabled: true,
    order: i,
  }));
