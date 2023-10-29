import { httpClient } from "@/http";
import { DiscoverMoviesQueryParams, MovieListResponse } from "@/types";

export const MovieService = {
  getDiscoverMovies: async ({
    page = 1,
    sort_by = "popularity.desc"
  }: DiscoverMoviesQueryParams) => {
    return await httpClient
      .get("discover/movie", {
        searchParams: {
          page,
          sort_by
        }
      })
      .json<MovieListResponse>();
  }
};
