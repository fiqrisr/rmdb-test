import Link from "next/link";
import { useRouter } from "next/router";

import { MovieListItem } from "@/types";

import { MovieCard } from "./movie-card";

type MovieListProps = {
  movieList: MovieListItem[];
  isSearchPage?: boolean;
};

export const MovieList = ({ movieList, isSearchPage }: MovieListProps) => {
  const { query } = useRouter();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
      {movieList.map((movie) => (
        <Link
          href={{
            pathname: `/movie/${movie.id}`,
            ...(isSearchPage
              ? {
                  query: {
                    from: "search",
                    q: query.q
                  }
                }
              : {})
          }}
          key={movie.id}
        >
          <MovieCard
            name={movie.original_title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            vote={+movie.vote_average.toFixed(1)}
          />
        </Link>
      ))}
    </div>
  );
};
