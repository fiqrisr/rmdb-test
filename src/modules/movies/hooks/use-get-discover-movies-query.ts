import { useInfiniteQuery } from "@tanstack/react-query";

import { SortBy } from "@/types";

import { MovieService } from "../services/movie-service";

type UseGetDiscoverMoviesQueryProps = {
  queryParams?: {
    page?: number;
    sortBy: SortBy;
  };
};

export const useGetDiscoverMoviesQuery = ({
  queryParams
}: UseGetDiscoverMoviesQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ["discover_movies", queryParams],
    queryFn: async ({ pageParam }) => {
      return await MovieService.getDiscoverMovies({
        page: pageParam,
        sort_by: queryParams?.sortBy
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    }
  });
};
