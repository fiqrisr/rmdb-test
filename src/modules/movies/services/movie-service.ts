import { httpClient } from "@/http";
import {
  DiscoverMoviesQueryParams,
  MovieCrew,
  MovieDetailsResponse,
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
  },

  getMovieDetails: async ({ movieId }: { movieId: number | null }) => {
    return await httpClient
      .get(`movie/${movieId}`, {
        searchParams: {
          append_to_response: "credits",
          language: "en-US"
        }
      })
      .json<MovieDetailsResponse>();
  },

  getMovieGenres: async () => {
    return await httpClient
      .get("genre/movie/list", {
        searchParams: {
          language: "en-US"
        }
      })
      .json<Array<{ id: number; name: string }>>();
  }
};
