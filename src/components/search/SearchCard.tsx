import { Star } from "lucide-react";
import type { MediaItem } from "../../types/types";
import { Link } from "react-router-dom";


type SearchCardProps={
    media:MediaItem
    media_Types:string
}

const SearchCard = ({media,media_Types}:SearchCardProps) => {
  return (
    <Link to={`/${media_Types}/${media.title??media.name}/${media.id}`}>
    <div className="movie-card cursor-pointer group relative bg-surface-container-low rounded-xl overflow-hidden shadow-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10">
      <div className="aspect-2/3 overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-700"
          src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w342${media.poster_path}`
                      : "/no-poster.png"
                  }
          alt={media.title ?? media.name}
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
          <span className="material-symbols-outlined text-primary text-[16px]">
            <Star size={16} fill="#c0c1ff" color="#c0c1ff" />
          </span>
          <span className="text-primary font-label-sm">{media.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-headline-lg-mobile text-white truncate mb-1">
          {media.name??media.title}
        </h4>
        <div className="flex items-center gap-3 text-on-surface-variant font-label-sm mb-4">
          <span>{media.release_date??media.first_air_date}</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default SearchCard;
