import { useState } from "react";
import Filter from "../components/discovery/Filter";
import useFilterData from "../hooks/useFilterData";
import type { MediaResponse } from "../types/types";
import useFetchInfine from "../hooks/useFetchInfine";
import { useBuildTMDBEndpoint } from "../hooks/useBuildFilterUrl";
import { ArrowDown } from "lucide-react";
import SearchCard from "../components/search/SearchCard";
import StateMessage from "../components/StateMessage";
import { getErrorMessage } from "../utils/error";

const Discovery = () => {
  const [type, setType] = useState<"tv" | "movie">("movie");
  const {
    genres,
    language,
    minRating,
    releaseDateFrom,
    sortBy,
    releaseDateTo,
  } = useFilterData();

  const queryKey = [
    type,
    "discover",
    sortBy ?? "popularity.desc",
    minRating ?? 0,
    language ?? "all",
    releaseDateFrom ?? "all",
    releaseDateTo ?? "all",
    genres?.join(",") ?? "",
  ];

  const endpoint = useBuildTMDBEndpoint(type, {
    sortBy,
    genres,
    language,
    minRating,
    releaseDateFrom,
    releaseDateTo,
  });
  const { data, isLoading, fetchNextPage, isFetchingNextPage,hasNextPage,isError,error,refetch } =
    useFetchInfine<MediaResponse>({
      endpoint: endpoint,
      keys: [queryKey.toString()],
    });

  if (isLoading) {
    return (
      <>
        <div className="p-5">
          <div className="flex justify-center items-center gap-10 text-xl mt-4 mb-4  ">
            <button
              className={`${type === "movie" ? `bg-primary/15 border border-primary/30` : `bg-primary/5 border-primary/30 opacity-50 `} py-2 px-4 rounded-full cursor-pointer`}
              onClick={() => setType("movie")}
            >
              Movies
            </button>
            <button
              className={`${type === "tv" ? `bg-primary/15 border border-primary/30` : `bg-primary/5 border-primary/30 opacity-50 `} py-2 px-4 rounded-full cursor-pointer`}
              onClick={() => setType("tv")}
            >
              TV Shows
            </button>
          </div>
          <div className="lg:flex gap-2 flex-col">
          <Filter />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-gutter">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="aspect-2/3 rounded-xl bg-white/10 animate-pulse shrink-0"
              />
            ))}
          </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="p-5">
        <div className="flex justify-center items-center gap-10 text-xl mt-4 mb-4">
          <button
            className={`${type === "movie" ? `bg-primary/15 border border-primary/30` : `bg-primary/5 border-primary/30 opacity-50 `} py-2 px-4 rounded-full cursor-pointer`}
            onClick={() => setType("movie")}
          >
            Movies
          </button>
          <button
            className={`${type === "tv" ? `bg-primary/15 border border-primary/30` : `bg-primary/5 border-primary/30 opacity-50 `} py-2 px-4 rounded-full cursor-pointer`}
            onClick={() => setType("tv")}
          >
            TV Shows
          </button>
        </div>
        <div className="lg:flex gap-5 flex-col">
          <Filter />
          <StateMessage
            variant="error"
            title="Discovery failed"
            message={getErrorMessage(error)}
            actionLabel="Try Again"
            onAction={() => void refetch()}
            className="flex-1"
          />
        </div>
      </div>
    );
  }

  if (!data || data.pages.length === 0) {
    return (
      <div className="p-5">
        <div className="lg:flex gap-5 flex-col">
          <Filter />
          <StateMessage
            title="No matches found"
            message="Try changing the filters to discover more titles."
            className="flex-1"
          />
        </div>
      </div>
    );
  }
  const results =
    data.pages
      .flatMap((page) => page.results)
      .filter((media) => media.vote_average !== undefined) ?? [];

  if (results.length === 0) {
    return (
      <div className="p-5">
        <div className="flex gap-5">
          <Filter />
          <StateMessage
            title="No matches found"
            message="Try changing the filters to discover more titles."
            className="flex-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-center items-center gap-10 text-xl mt-4 mb-4  ">
        <button
          className={`${type === "movie" ? `bg-primary/15 border border-primary/30` : `bg-primary/5 border-primary/30 opacity-50 `} py-2 px-4 rounded-full cursor-pointer`}
          onClick={() => setType("movie")}
        >
          Movies
        </button>
        <button
          className={`${type === "tv" ? `bg-primary/15 border border-primary/30` : `bg-primary/5 border-primary/30 opacity-50 `} py-2 px-4 rounded-full cursor-pointer`}
          onClick={() => setType("tv")}
        >
          TV Shows
        </button>
      </div>
      <div className=" gap-5 lg:flex lg:flex-row flex flex-col">
        <Filter />
        <main className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-gutter">
            {results?.map((media) => (
              <SearchCard key={media.id} media={media} media_Types={type} />
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            {
              hasNextPage&&
              <button
                className="group flex items-center gap-3 bg-surface-container-high border border-white/10 px-10 py-4 rounded-full font-label-sm text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? (
                  "Loading..."
                ) : (
                  <>
                    LOAD MORE
                    <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
                      <ArrowDown />
                    </span>
                  </>
                )}
              </button>
            }
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discovery;
