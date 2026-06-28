import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { FilterData } from "../types/types";

const useFilterData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? undefined;

  const sortBy = searchParams.get("sortBy") as FilterData["sortBy"];

  const genres = searchParams.get("genres")?.split(",") ?? [];

  const minRating = searchParams.get("minRating")
    ? Number(searchParams.get("minRating"))
    : undefined;

  const releaseDateFrom =
    searchParams.get("releaseDateFrom") ?? undefined;

  const releaseDateTo =
    searchParams.get("releaseDateTo") ?? undefined;

  const language = searchParams.get("language") ?? undefined;

  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined;

  const setFilters = useCallback(
    (filters: Partial<FilterData>) => {
      setSearchParams((params) => {
        Object.entries(filters).forEach(([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          ) {
            params.delete(key);
          } else if (Array.isArray(value)) {
            params.set(key, value.join(","));
          } else {
            params.set(key, String(value));
          }
        });

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    search,
    sortBy,
    genres,
    minRating,
    releaseDateFrom,
    releaseDateTo,
    language,
    page,
    setFilters,
  };
};

export default useFilterData;