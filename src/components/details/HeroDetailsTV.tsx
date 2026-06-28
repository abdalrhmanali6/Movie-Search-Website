import type { tvDetails } from "../../types/types";
import { Star,  Calendar, Play,  CircleAlert } from "lucide-react";

type HeroDetailsTVProps={
  tv:tvDetails,
  setShowTrailer:(value:boolean)=>void
}

const HeroDetailsTV = ({tv,setShowTrailer}:HeroDetailsTVProps) => {

  return (
    <section className="relative w-full h-150 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
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
                  src={`https://image.tmdb.org/t/p/w342${tv.poster_path}`}
                />
              </div>
            </div>

            <div className="grow flex flex-col space-y-4 max-w-4xl">
            <span className="bg-[#0d1c2db3] text-white px-3 py-1 w-fit rounded-full font-label-sm text-label-sm uppercase tracking-widest border border-primary/30">{tv.status}</span>
              <div className="flex flex-wrap gap-2 mb-2">
                {
                  tv.genres.map((gener)=>(
                <span key={gener.id} className="glass-badge px-3 py-1 rounded-lg text-label-sm uppercase tracking-wider">
                  {gener.name}
                </span>
                  ))
                }
              </div>
              <h1 className="font-display-lg text-display-lg leading-tight text-on-surface">
                {tv.name}
              </h1>
              <p className="font-headline-lg-mobile text-primary opacity-90 italic">
                {tv.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-gutter pt-2">
                <div className="flex items-center gap-2">
                  <Star color="#8083ff" fill="#8083ff" />
                  <span className="font-headline-lg-mobile">
                    {tv.vote_average.toFixed(1)}/10
                  </span>
                  <span className="text-on-surface-variant font-body-md">
                    ({tv.vote_count} Reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                  <Calendar />
                  <span className="text-on-surface-variant font-label-sm text-label-sm">• {tv.first_air_date} - {tv.last_air_date}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                <button className="bg-primary-container text-on-primary-container font-body-md  md:px-8 md:py-4 px-6 py-3  rounded-lg flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary-container/20 cursor-pointer"
                onClick={()=>setShowTrailer(true)}>
                  <Play color="#3730A3" fill="#3730A3" />
                  Play Trailer
                </button>
                  <button className=" bg-white/10 text-on-surface border border-white/20 px-8 py-4 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-white/20 transition-all  cursor-pointer active:opacity-70"
                 onClick={() =>window.open(`${tv.homepage}`, '_blank')}>
                <CircleAlert  /> More Info
                </button>
              </div>
            </div>
          </div>
        </div>
        </section>
  )
}

export default HeroDetailsTV