import { useMemo } from "react";
import type { FilterData } from "../types/types";

type MediaType = "movie" | "tv";

export const useBuildTMDBEndpoint = (
  type: MediaType,
  filters: Partial<FilterData>
) => {
  const endpoint = useMemo(() => {
    const baseUrl = `discover/${type}`;

    const params = new URLSearchParams({
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      sort_by: filters.sortBy ?? "popularity.desc",
    });

   
    if (filters.genres?.length) {
      params.append("with_genres", filters.genres.join(","));
    }

    
    if (filters.language) {
      params.append("with_original_language", filters.language);
    }

    // rating
    if (filters.minRating !== undefined) {
      params.append("vote_average.gte", String(filters.minRating));
    }

    // date filters
    if (filters.releaseDateFrom) {
      if (type === "movie") {
        params.append("release_date.gte", filters.releaseDateFrom);
      } else {
        params.append("first_air_date.gte", filters.releaseDateFrom);
      }
    }

    if (filters.releaseDateTo) {
      if (type === "movie") {
        params.append("release_date.lte", filters.releaseDateTo);
      } else {
        params.append("first_air_date.lte", filters.releaseDateTo);
      }
    }

    // page
    if (filters.page) {
      params.append("page", String(filters.page));
    }

    return `${baseUrl}?${params.toString()}`;
  }, [type, filters]);

  return endpoint;
};