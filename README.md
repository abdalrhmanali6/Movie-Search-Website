# Movie Search Website

A modern movie and TV discovery app built with React, TypeScript, Vite, and the TMDB API. Browse trending titles, search for movies and shows, filter discoveries, and open detail pages with overview information and trailers.

## Live Demo

Deployed URL: `TODO: add deployed site URL here`

## Features

- Browse trending, now playing, top-rated, and popular media.
- Search movies and TV shows with a responsive dropdown experience.
- View detailed movie and TV pages.
- Discover titles with filters.
- Navigate by media type, genre, trending lists, and search results.
- Responsive UI built with Tailwind CSS.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- Swiper
- Lucide React
- TMDB API

## Getting Started

### Prerequisites

- Node.js
- npm
- A TMDB API access token

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
  components/    Reusable UI components
  hooks/         Data fetching, filtering, search, and debounce hooks
  layout/        Main app layout
  pages/         Route-level pages
  style/         Global styles
  types/         Shared TypeScript types
  utils/         Axios client and helpers
```



## License

This project is for learning and portfolio use.
