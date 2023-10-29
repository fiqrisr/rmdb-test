import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton, Spinner, Image } from "@nextui-org/react";

import { MainLayout } from "@/layouts";

import { useGetMovieDetails } from "../hooks/use-get-movie-details";
import { BASE_TMDB_IMAGE_URL, MOVIE_BACKDROP_SIZE } from "@/configs";
import { getImageDominantColor } from "@/utils";

export const MovieDetailsPage = () => {
  const { query } = useRouter();
  const movieId = query.id as unknown as number;
  const [backdropImageDominantColor, setBackdropImageDominantColor] = useState<
    [number, number, number]
  >([0, 0, 0]);

  const { data, isLoading } = useGetMovieDetails({
    queryParams: {
      movieId
    },
    options: {
      enabled: !!movieId
    }
  });

  const movieBackdropUrl = `${BASE_TMDB_IMAGE_URL}/${MOVIE_BACKDROP_SIZE}/${data?.backdrop_path}`;
  const moviePosterUrl = `${BASE_TMDB_IMAGE_URL}/w500/${data?.poster_path}`;

  useEffect(() => {
    (async () => {
      if (!isLoading && data && data.backdrop_path) {
        const dominantColor = await getImageDominantColor(movieBackdropUrl);

        if (dominantColor) {
          const [r, g, b] = dominantColor.value;
          setBackdropImageDominantColor([r, g, b]);
        }
      }
    })();
  }, [data, isLoading, movieBackdropUrl]);

  return (
    <MainLayout>
      <div
        className="w-full bg-auto bg-no-repeat bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${movieBackdropUrl})` }}
      >
        <div
          className="p-12 backdrop-blur"
          style={{
            background: `rgba(${[...backdropImageDominantColor, 0.6]})`
          }}
        >
          <div className="flex gap-x-10">
            <Skeleton className="rounded-2xl h-[384px]" isLoaded={!isLoading}>
              <Image
                className="w-64 shadow-2xl"
                src={moviePosterUrl}
                alt={`${data?.original_title} poster`}
              />
            </Skeleton>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}
    </MainLayout>
  );
};
