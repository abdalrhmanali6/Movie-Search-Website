export interface MediaItem {
  id: number;
  poster_path: string;
  title?: string;   
  name?: string;    
  vote_average: number;
  original_language:string;
  popularity:number;
  backdrop_path:string;
  vote_count:number;
  overview:string;
  release_date?:string;
  first_air_date?:string
  media_type?: "movie" | "tv";
}

export interface MediaResponse {
  page: number;
  results: MediaItem[];
  total_results:number;
  total_pages: number;
}

export interface Video {
  id: number
  results: VideoData[]
}

export interface VideoData {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  type: string
  official: boolean
  published_at: string
}


export interface movieDetails {
  backdrop_path: string
  genres: Genre[]
  homepage: string
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
}

export interface Genre {
  id: number
  name: string
}


export interface tvDetails {
  adult: boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  name: string
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  seasons: Season[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}


export interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface FullCast {
  cast: Cast[]
  id: number
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
  credit_id: string
  order: number
}



export type SortBy =
  | "popularity.desc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "first_air_date.desc"
  | "first_air_date.asc"

export interface FilterData {
 
  search?: string;

  sortBy?: SortBy;

  genres?: string[];

  minRating?: number;

  releaseDateFrom?: string;
  releaseDateTo?: string;

  language?: string;

  page?: number;
}

export const genres:{id:string,name:string}[] = [
  { id: "28", name: "Action" },
  { id: '12', name: "Adventure" },
  { id: '16', name: "Animation" },
  { id: '35', name: "Comedy" },
  { id: '80', name: "Crime" },
  { id: '99', name: "Documentary" },
  { id: '18', name: "Drama" },
  { id: '10751', name: "Family" },
  { id: '14', name: "Fantasy" },
  { id: '36', name: "History" },
  { id: '27', name: "Horror" },
  { id: '10402', name: "Music" },
  { id: '9648', name: "Mystery" },
  { id: '10749', name: "Romance" },
  { id: '878', name: "Science Fiction" },
  { id: '53', name: "Thriller" },
  { id: '10752', name: "War" },
] as const;

export const languages = [
  { value: "en", label: "English" },
  { value: "ja", label: "Japanese" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
] as const;