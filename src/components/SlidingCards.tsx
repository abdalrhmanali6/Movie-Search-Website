import { ChevronRight } from "lucide-react";
import useFetchDataQuery from "../hooks/useFetchQuery";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { MediaResponse } from "../types/types";
import { useNavigate } from "react-router-dom";
import StateMessage from "./StateMessage";
import { getErrorMessage } from "../utils/error";

type SlidingCardsProps = {
  endpoint: string;
  type: string;
  sectionTitle: string;
  titleKey?: "title" | "name";
  language?: string | undefined;
  mediaType?: "movie" | "tv";
  to: string;
};

const SlidingCards = ({
  endpoint,
  type,
  sectionTitle,
  titleKey = "title",
  language,
  mediaType,
  to,
}: SlidingCardsProps) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useFetchDataQuery<MediaResponse>({
    endpoint,
    keys: ["media", type],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-10 mt-8">
        <div className="h-7 w-40 bg-white/10 rounded animate-pulse" />
        <div className="flex gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-36 h-52 rounded-xl bg-white/10 animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <section className="mt-10 px-10">
        <StateMessage
          variant="error"
          title={`Could not load ${sectionTitle}`}
          message={getErrorMessage(error)}
          actionLabel="Try Again"
          onAction={() => void refetch()}
          className="min-h-60"
        />
      </section>
    );
  }

  if (!data?.results.length) {
    return (
      <section className="mt-10 px-10">
        <StateMessage
          title={`No ${sectionTitle.toLowerCase()} found`}
          message="There are no titles to show in this section right now."
          className="min-h-60"
        />
      </section>
    );
  }
  let results = data.results;
  if (language) {
    results = results.filter((result) => language === result.original_language);
  }

  if (results.length === 0) {
    return (
      <section className="mt-10 px-10">
        <StateMessage
          title={`No ${sectionTitle.toLowerCase()} found`}
          message="There are no matching titles to show in this section right now."
          className="min-h-60"
        />
      </section>
    );
  }
  return (
    <section className="mt-10 px-10 group/section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold tracking-wide">
          {sectionTitle}
        </h2>
        <button
          className="flex items-center gap-1 text-sm font-semibold text-stone-300 opacity-0 group-hover/section:opacity-100 transition-all duration-300 hover:text-white"
          onClick={() => navigate(to)}
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          modules={[ FreeMode]}
          freeMode
          speed={10000}
        >
          {results.map((item) => (
            <SwiperSlide key={item.id} style={{ width: "auto" }}>
              <Card
                image={item.poster_path}
                title={
                  item.media_type
                    ? item.media_type === "movie"
                      ? (item.title ?? "Unknown")
                      : (item.name ?? "Unknown")
                    : (item[titleKey] ?? "Unknown")
                }
                id={item.id}
                mediaType={(item.media_type ?? mediaType)!}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SlidingCards;
