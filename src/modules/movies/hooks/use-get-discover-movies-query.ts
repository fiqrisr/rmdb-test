import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { SortBy } from "@/types";

import { MovieService } from "../services/movie-service";

type UseGetDiscoverMoviesQueryProps = {
  queryParams?: {
    page: number;
    sortBy: SortBy;
  };
  options?: UseQueryOptions;
};

export const useGetDiscoverMoviesQuery = ({
  queryParams
}: UseGetDiscoverMoviesQueryProps = {}) => {
  return useQuery({
    queryKey: ["discover_movies", queryParams],
    queryFn: async () => {
      return await MovieService.getDiscoverMovies({
        page: queryParams?.page,
        sort_by: queryParams?.sortBy
      });
    }
  });
};
