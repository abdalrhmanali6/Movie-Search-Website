import { Star, Clock, Calendar, Play,  CircleAlert } from "lucide-react";
import type { movieDetails } from "../../types/types";

type HeroDetailsMovieProps={
  movie:movieDetails,
  setShowTrailer:(value:boolean)=>void
}

const HeroDetailsMovie = ({movie,setShowTrailer}:HeroDetailsMovieProps) => {
  return (
     <section className="relative w-full h-150 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative h-full flex items-end px-margin-mobile md:px-margin-desktop pb-12">
          <div className="flex flex-col md:flex-row gap-gutter items-end md:items-start w-full">
            <div className="hidden md:block w-72 shrink-0 group">
              <div className="relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105 border border-white/10 aspect-2/3">
                <img
                  alt="Neon Frontier Poster"
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                />
              </div>
            </div>

            <div className="grow space-y-4 max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-2">
                {
                  movie.genres.map((gener)=>(
                <span  key={gener.id} className="glass-badge px-3 py-1 rounded-lg text-label-sm uppercase tracking-wider">
                  {gener.name}
                </span>
                  ))
                }
              </div>
              <h1 className="font-display-lg text-display-lg leading-tight text-on-surface">
                {movie.title}
              </h1>
              <p className="font-headline-lg-mobile text-primary opacity-90 italic">
                {movie.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-gutter pt-2">
                <div className="flex items-center gap-2">
                  <Star color="#8083ff" fill="#8083ff" />
                  <span className="font-headline-lg-mobile">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                  <span className="text-on-surface-variant font-body-md">
                    ({movie.vote_count} Reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                  <Clock /> {movie.runtime} Min
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                  <Calendar />
                  {movie.release_date}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                <button className="bg-primary-container text-on-primary-container font-body-md md:px-8 md:py-4 px-6 py-3 rounded-lg flex items-center gap-2 md:text-base text-sm transition-transform active:scale-95 shadow-lg shadow-primary-container/20 cursor-pointer"
                onClick={()=>setShowTrailer(true)}>
                  <Play color="#3730A3" fill="#3730A3" />
                  Play Trailer
                </button>
                  <button className=" bg-white/10 text-on-surface border border-white/20 px-8 py-4 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-white/20 transition-all  cursor-pointer active:opacity-70"
                 onClick={() =>window.open(`${movie.homepage}`, '_blank')}>
                <CircleAlert  /> More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroDetailsMovie