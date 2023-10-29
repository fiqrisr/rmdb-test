import { httpClient } from "@/http";
import {
  DiscoverMoviesQueryParams,
  MovieListResponse,
  SearchMoviesQueryParams
} from "@/types";

export const MovieService = {
  getDiscoverMovies: async ({
    page = 1,
    sort_by = "popularity.desc"
  }: DiscoverMoviesQueryParams) => {
    return await httpClient
      .get("discover/movie", {
        searchParams: {
          page,
          sort_by,
          "vote_average.gte": 5,
          "vote_count.gte": 100
        }
      })
      .json<MovieListResponse>();
  },

  searchMovie: async ({ page = 1, query }: SearchMoviesQueryParams) => {
    return await httpClient
      .get("search/movie", {
        searchParams: {
          page,
          query
        }
      })
      .json<MovieListResponse>();
  }
};
