# New Wave

A premium cinematic movie discovery website built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Swiper.

## Features

- **Popular movies** — Inception, The Dark Knight, Interstellar, Parasite, and more (TMDB posters)
- **Homepage** — Hero carousel, latest movies, trending, awards, video clips, gallery, newsletter
- **Movies** — Live search (title, director, cast, synopsis), genre filters, sort, load more
- **Movie detail** — Play Movie, Play Trailer, watchlist, clips, awards, cast, gallery
- **Admin portal** (`/admin`) — Manage movies and hero banners (localStorage-backed)
- **Modals** — Video player and image lightbox with keyboard support

## Admin

- Login: [http://localhost:5173/admin/login](http://localhost:5173/admin/login) (required before accessing the panel)
- Default credentials: `admin` / `newwave2025` (set `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` in `.env`)
- Movies: add, edit, delete
- Hero banners: reorder slides, link movies, custom title/description/images

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3
- React Router 7
- Framer Motion
- Swiper
- Lucide React
