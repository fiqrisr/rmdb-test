import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { MovieCrew, MovieDetailsResponse } from "@/types";

import { MovieService } from "../services/movie-service";

type UseGetMovieDetailsProps = {
  queryParams: {
    movieId: number;
  };
  options?: Omit<UseQueryOptions<MovieDetailsResponse>, "queryKey">;
};

export const useGetMovieDetails = ({
  queryParams,
  options
}: UseGetMovieDetailsProps) => {
  return useQuery({
    queryKey: ["movie_details", queryParams],
    queryFn: async () => {
      return await MovieService.getMovieDetails({
        movieId: queryParams?.movieId || null
      });
    },
    ...options
  });
};
