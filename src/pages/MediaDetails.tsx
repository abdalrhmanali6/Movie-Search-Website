import { useParams } from "react-router-dom";
import useFetchDataQuery from "../hooks/useFetchQuery";
import type { movieDetails,tvDetails } from "../types/types";
import { useState } from "react";
import VideoFrame from "../components/VideoFrame";
import HeroDetailsMovie from "../components/details/HeroDetailsMovie";
import HeroDetailsTV from "../components/details/HeroDetailsTV";
import OverviewMovie from "../components/details/OverviewMovie";
import OverviewTv from "../components/details/OverviewTv";
import SlidingCards from "../components/SlidingCards";
import StateMessage from "../components/StateMessage";
import { getErrorMessage } from "../utils/error";

type paramprops={
  id:string
  mediaType:"tv" | "movie"
}

const MediaDetails = () => {
  const { id, mediaType } = useParams<paramprops>();
  const [showTrailer,setShowTrailer]=useState<boolean>(false)
  const { data: media, isLoading, isError, error, refetch } = useFetchDataQuery<movieDetails|tvDetails>({
    endpoint: `${mediaType}/${id}?language=en-US`,
    keys: [mediaType!, id!],
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) {
    return (
      <StateMessage
        variant="error"
        title="Could not load details"
        message={getErrorMessage(error)}
        actionLabel="Try Again"
        onAction={() => void refetch()}
        className="min-h-[70vh]"
      />
    );
  }

  if (!id || !mediaType || !media) {
    return (
      <StateMessage
        title="Invalid media link"
        message="This movie or TV show link is missing information."
        className="min-h-[70vh]"
      />
    );
  }

  return (
    <div className="flex flex-col gap-10" >
     {
         'title' in media && (
          <>
            <HeroDetailsMovie movie={media} setShowTrailer={setShowTrailer}/>
            <OverviewMovie  id={id}  overview={media.overview} />
          </>
        )
      }
      {
        'name' in media && (
          <>
         <HeroDetailsTV tv={media} setShowTrailer={setShowTrailer}/>
         <OverviewTv  id={id} media={media}/>
          </>
        )
      }


       {
        showTrailer&&
        <VideoFrame id={media.id}  media={mediaType} setShowTrailer={setShowTrailer} showTrailer={showTrailer} />
     }
     <SlidingCards  endpoint={`${mediaType}/${id}/similar?language=en-US&page=1`} sectionTitle="More Like This" type="similar" language="en" 
     to={mediaType==="movie"?"/Movies":"/Tvshow"}/>
    </div>
  );
};

export default MediaDetails;
