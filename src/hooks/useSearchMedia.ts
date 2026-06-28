import { useLocation } from "react-router-dom";
import useFilterData from "./useFilterData";
import type { MediaResponse } from "../types/types";
import useFetchInfine from "./useFetchInfine";

const useSearchMedia = (searchQuery?: string) => {
  const { search: urlSearch } = useFilterData();
  const { pathname } = useLocation();

  const media_Types = pathname.includes("tv")
    ? "tv"
    : pathname.includes("movie")
    ? "movie"
    : "multi";

  const search = searchQuery ?? urlSearch;

  const query = useFetchInfine<MediaResponse>({
    endpoint: `search/${media_Types}?query=${encodeURIComponent(
      search ?? ""
    )}&include_adult=false&language=en-US`,
    keys: ["search", media_Types, search ?? ""],
  });

  const results =
    query.data?.pages
      .flatMap((page) => page.results)
      .filter((media) => media.vote_average !== undefined) ?? [];

  return {
    ...query,
    results,
    media_Types,
    search,
    totalResults: query.data?.pages[0]?.total_results ?? 0,
  };
};

export default useSearchMedia;