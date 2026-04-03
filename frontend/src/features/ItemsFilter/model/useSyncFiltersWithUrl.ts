import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStores } from "@/app/providers";

export const useSyncFiltersWithUrl = () => {
  const { filters } = useStores();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    filters.setFromQuery(searchParams);
  }, []);

  // useEffect(() => {
  //   const current = searchParams.toString();
  //   const next = filters.queryString;
  
  //   if (current !== next) {
  //     setSearchParams(next);
  //   }
  // }, [filters.queryString]);

  useEffect(() => {
    setSearchParams(filters.queryString);
  }, [
    filters.search,
    filters.categories,
    filters.needsRevision,
    filters.sortColumn,
    filters.sortDirection,
    filters.page,
  ]);
};
