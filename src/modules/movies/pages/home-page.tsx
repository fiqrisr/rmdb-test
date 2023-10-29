import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";

import { MainLayout } from "@/layouts";
import { MovieListItem, SortBy } from "@/types";

import { useGetDiscoverMoviesQuery } from "../hooks/use-get-discover-movies-query";
import { HeroCarousel, HeroCarouselProps } from "../components/hero-carousel";
import { MovieList } from "../components/movie-list";
import { MovieSortSelect } from "../components/movie-sort-select";

const populateHeroCarouselData = (
  movieList: MovieListItem[]
): HeroCarouselProps["slideList"] => {
  if (movieList.length >= 10) {
    return [...movieList].splice(0, 10).map((movie) => ({
      movieId: movie.id,
      movieName: movie.original_title,
      movieDescription: movie.overview,
      backdropPath: movie.backdrop_path
    }));
  }

  return [];
};

export const HomePage = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetDiscoverMoviesQuery({
      queryParams: {
        sortBy
      }
    });
  const [slideData, setSlideData] = useState<HeroCarouselProps["slideList"]>(
    []
  );

  useEffect(() => {
    if (
      !isLoading &&
      data &&
      data?.pages[0].results?.length > 0 &&
      firstRender
    ) {
      setFirstRender(false);
      setSlideData(populateHeroCarouselData(data.pages[0].results));
    }
  }, [isLoading, data, firstRender]);

  return (
    <MainLayout
      hero={
        <HeroCarousel
          slideList={slideData}
          isLoading={isLoading && firstRender}
        />
      }
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-4xl">Discover Movies</h1>
        <MovieSortSelect selectedSort={sortBy} setSelectedSort={setSortBy} />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      <div className="flex flex-col gap-y-8">
        {data?.pages?.map((page) => (
          <MovieList key={page.page} movieList={page?.results ?? []} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        </div>
      )}
    </MainLayout>
  );
};
