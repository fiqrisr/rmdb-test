import { useEffect, useState } from "react";

import { MainLayout } from "@/layouts";
import { MovieListItem, SortBy } from "@/types";

import { useGetDiscoverMoviesQuery } from "../hooks/use-get-discover-movies-query";
import { HeroCarousel, HeroCarouselProps } from "../components/hero-carousel";

const populateHeroCarouselData = (
  movieList: MovieListItem[]
): HeroCarouselProps["slideList"] => {
  if (movieList.length >= 10) {
    return movieList.splice(0, 10).map((movie) => ({
      movieId: movie.id,
      movieName: movie.original_title,
      movieDescription: movie.overview,
      backdropPath: movie.backdrop_path
    }));
  }

  return [];
};

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const { data, isLoading } = useGetDiscoverMoviesQuery({
    queryParams: {
      page: currentPage,
      sortBy
    }
  });
  const [slideData, setSlideData] = useState<HeroCarouselProps["slideList"]>(
    []
  );

  useEffect(() => {
    if (!isLoading && data && data?.results?.length > 0) {
      setSlideData(populateHeroCarouselData(data.results));
    }
  }, [isLoading, data]);

  return (
    <MainLayout hero={<HeroCarousel slideList={slideData} />}>test</MainLayout>
  );
};
