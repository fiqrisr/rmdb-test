import Link from "next/link";

import { MovieCard } from "./movie-card";
import { MovieListItem } from "@/types";

type MovieListProps = {
  movieList: MovieListItem[];
};

export const MovieList = ({ movieList }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
      {movieList.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard
            name={movie.original_title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            vote={movie.vote_average}
          />
        </Link>
      ))}
    </div>
  );
};
