import { AlertTriangle, SearchX, Star } from "lucide-react";;
import type { MediaItem } from "../../types/types";
import {useNavigate } from "react-router-dom";
import useSearchMedia from "../../hooks/useSearchMedia";
import { getErrorMessage } from "../../utils/error";

interface SearchDropDownProps {
  setLocalSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
   open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
  search:string|undefined
}

const SearchDropDown = ({ setLocalSearch,setOpen,search }: SearchDropDownProps) => {

  const navigate = useNavigate();
  const {results,isLoading,media_Types,data,isError,error}=useSearchMedia(search)
  if (!search) return null;
  if (isLoading) {
    return (
      <div className="absolute top-14  w-120 glass-panel rounded-xl shadow-2xl overflow-hidden z-50">
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-white/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  

  if (isError) {
    return (
      <div className="absolute top-14 w-120 glass-panel rounded-xl shadow-2xl overflow-hidden z-50">
        <div className="flex gap-3 p-6 text-on-surface-variant">
          <AlertTriangle className="mt-1 shrink-0 text-error" size={20} />
          <div>
            <h3 className="mb-1 font-label-sm text-label-sm uppercase text-white">
              Search unavailable
            </h3>
            <p>{getErrorMessage(error)}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.pages.length === 0 || results.length === 0) {
    return (
      <div className="absolute top-14 w-120 glass-panel rounded-xl shadow-2xl overflow-hidden z-50">
        <div className="flex gap-3 p-6 text-on-surface-variant">
          <SearchX className="mt-1 shrink-0 text-primary" size={20} />
          <div>
            <h3 className="mb-1 font-label-sm text-label-sm uppercase text-white">
              No matches
            </h3>
            <p>Try a different movie or TV show name.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleClick = (
    type: MediaItem["media_type"],
    name: MediaItem["name"],
    title: MediaItem["title"],
    id: MediaItem["id"],
  ) => {
    const resolvedType =
      media_Types === "tv"
        ? "tv"
        : media_Types === "movie"
          ? "movie"
          : (type || (title ? "movie" : "tv"));
    setLocalSearch("");
    setOpen(false)
    navigate(`/${resolvedType}/${name || title}/${id}`);
  };

  return (
    <div className="absolute top-14  w-120 glass-panel rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="p-6">
        <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-4 tracking-widest">
          Top Matches
        </h3>

        <div className="space-y-3">
          {results?.slice(0, 4).map((media) => (
            <div
              key={`${media.media_type}-${media.id}`}
              className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
              onClick={() =>
                handleClick(
                  media.media_type,
                  media.name,
                  media.title,
                  media.id,
                )
              }
            >
              <div className="w-16 h-24 rounded overflow-hidden shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w342${media.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={media.title ?? media.name}
                />
              </div>

              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-headline-lg text-body-md text-on-surface group-hover:text-primary transition-colors">
                    {media.title ?? media.name}
                    {" ("}
                    {media.release_date?.slice(0, 4) ??
                      media.first_air_date?.slice(0, 4) ??
                      "----"}
                    {")"}
                  </span>
                  {media.media_type && (
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {media.media_type}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Star size={16} fill="#c0c1ff" color="#c0c1ff" />
                  <span className="font-bold">
                    {media.vote_average?.toFixed(1) ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDropDown;
