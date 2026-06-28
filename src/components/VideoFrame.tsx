import useFetchDataQuery from "../hooks/useFetchQuery";
import type { Video, VideoData } from "../types/types";

interface VideoFrameProps {
  id: number;
  showTrailer: boolean;
  setShowTrailer: (value: boolean) => void;
  media: "tv" | "movie";
}

const VideoFrame = ({
  id,
  showTrailer,
  setShowTrailer,
  media,
}: VideoFrameProps) => {
  const { data, isLoading } = useFetchDataQuery<Video>({
    endpoint: `/${media === "movie" ? "movie" : "tv"}/${id}/videos?language=en-US`,
    keys: ["movie-video", String(id)],
  });

  if (!showTrailer) return null;
  if (isLoading) return null;
  if (!data) return null;

  const video: VideoData | undefined =
    data.results.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official,
    ) ??
    data.results.find(
      (video) => video.type === "Teaser" && video.site === "YouTube",
    );

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={() => setShowTrailer(false)}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -top-10 right-0 text-white text-2xl cursor-pointer"
          onClick={() => setShowTrailer(false)}
          aria-label="Close trailer"
        >
          X
        </button>

        <iframe
          className="w-[90vw] max-w-5xl h-[70vh] rounded-xl"
          src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
          title={video.name}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoFrame;
