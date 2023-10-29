import { useInfiniteQuery } from "@tanstack/react-query";

import { MovieService } from "../services/movie-service";

type UseGetSearchMoviesQueryProps = {
  queryParams?: {
    page?: number;
    query: string;
  };
};

export const useGetSearchMoviesQuery = ({
  queryParams
}: UseGetSearchMoviesQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ["search_movies", queryParams],
    queryFn: async ({ pageParam }) => {
      return await MovieService.searchMovie({
        page: pageParam,
        query: queryParams?.query ?? ""
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    }
  });
};
