import { Star ,Play,CircleAlert} from "lucide-react";
import useFetchDataQuery from "../hooks/useFetchQuery";
import type { MediaResponse,MediaItem } from "../types/types"; 
import { useState } from "react";
import VideoFrame from "./VideoFrame";
import { useNavigate } from "react-router-dom";
import StateMessage from "./StateMessage";
import { getErrorMessage } from "../utils/error";
type HeroProps = {
  endpoint: string;
  type: string;
  titleKey?: "title" | "name"; 
   language?:string | undefined
   mediaType: "tv"| "movie"
};

const Hero = ({
  endpoint,
  type,
  language,
  titleKey,
  mediaType 
}: HeroProps) => {

  const navigate=useNavigate()
  const [showTrailer,setShowTrailer]=useState<boolean>(false)

  const { data, isLoading, isError, error, refetch } = useFetchDataQuery<MediaResponse>({
    endpoint: endpoint,
    keys: ["movies",type],
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <StateMessage
        variant="error"
        title="Could not load featured title"
        message={getErrorMessage(error)}
        actionLabel="Try Again"
        onAction={() => void refetch()}
        className="min-h-150"
      />
    );
  }

  if (!data?.results.length) {
    return (
      <StateMessage
        title="No featured title found"
        message="There is nothing to show here right now. Try another section."
        className="min-h-150"
      />
    );
  }
  let results : MediaItem[]= data.results.filter(
    (result) => result.original_language === "en",
  );

   if(language){
  results=results.filter((result)=>(
    language===result.original_language
  ))
  }

  if (!results.length) {
    return (
      <StateMessage
        title="No featured title found"
        message="There are no matching English titles for this section right now."
        className="min-h-150"
      />
    );
  }

  const Movie:MediaItem = results.reduce((prev, current) =>
    current.popularity > prev.popularity ? current : prev,
  );
  
  return (
    <div
      className="h-150 bg-cover bg-center bg-no-repeat gap-5 flex flex-col justify-end pl-10 pb-20"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${Movie.backdrop_path})`,
      }}
    >
     <div className="flex  items-center gap-4 ">
        <span className="bg-primary text-on-primary px-3 py-1 rounded-lg font-label-sm text-label-sm uppercase tracking-wider">NEW RELEASE</span>
        <span className="text-white font-bold flex items-center gap-2">
             <Star color="#f5c000" fill="#f5c000"/> {Movie.vote_average.toFixed(1)} ({Movie.vote_count} votes)
        </span>
     </div>
     <h1 className="text-6xl font-bold">
         {
             titleKey ? Movie[titleKey] : Movie.title
         }
     </h1>
     <p className="text-gray-400  w-auto lg:text-xl text-sm">
        { Movie.overview}
     </p>
     <div className="flex gap-3">
        <button className="bg-primary text-on-primary md:px-8 md:py-4 px-6 py-3  rounded-lg font-label-md md:text-label-md text-label-sm  flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/20 cursor-pointer"
        onClick={()=>setShowTrailer(true)}>
            <Play  color="#3730A3" fill="#3730A3" />  Watch Trailer
        </button>
        <button className=" bg-white/10 text-on-surface border border-white/20 px-8 py-4 rounded-lg md:text-label-md text-label-sm  font-label-md text-label-md flex items-center gap-2 hover:bg-white/20 transition-all  cursor-pointer active:opacity-40"
        onClick={()=>navigate(`/${mediaType}/${Movie.name??Movie.title}/${Movie.id}`)}>
            <CircleAlert  /> More Info
        </button>
     </div>
    {
        showTrailer&&
        <VideoFrame id={Movie.id} setShowTrailer={setShowTrailer} showTrailer={showTrailer} media={mediaType}/>
    }
    </div>

  );
};

export default Hero;
