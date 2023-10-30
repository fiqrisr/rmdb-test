import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton, Image } from "@nextui-org/react";
import dayjs from "dayjs";
import { atom, useAtom, useAtomValue } from "jotai";

import { BASE_TMDB_IMAGE_URL, MOVIE_BACKDROP_SIZE } from "@/configs";
import { Breadcrumb } from "@/components";
import { MainLayout } from "@/layouts";
import { calcTime, getImageDominantColor } from "@/utils";

import { movieRatingListAtom } from "../atoms";
import { CastList } from "../components/cast-list";
import { RateMovie } from "../components/rate-movie";
import { useGetMovieDetails } from "../hooks/use-get-movie-details";

const formattedSearchQueryAtom = atom("");

export const MovieDetailsPage = () => {
  const { query } = useRouter();
  const movieId = query.id as unknown as number;
  const fromSearch = query.from === "search";
  const fromSearchQuery = query.q as string;
  const [formattedSearchQuery, setFormattedSearchQuery] = useAtom(
    formattedSearchQueryAtom
  );
  const [backdropImageDominantColor, setBackdropImageDominantColor] = useState<
    [number, number, number]
  >([0, 0, 0]);

  const movieDetailContainer = useRef(null);

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
  const movieDirector = data?.credits?.crew.find((c) => c.job === "Director")
    ?.original_name;
  const movieScreenplay = data?.credits?.crew.find(
    (c) => c.job === "Screenplay"
  )?.original_name;

  const movieRatingList = useAtomValue(movieRatingListAtom);
  const movieRating = movieRatingList.find(
    (rating) => rating.movieId === data?.id
  );

  useEffect(() => {
    (async () => {
      if (!isLoading && data && data.backdrop_path) {
        const searchParams = new URLSearchParams();
        searchParams.append("from", "search");
        searchParams.append("q", fromSearchQuery);
        setFormattedSearchQuery(searchParams.toString());

        const dominantColor = await getImageDominantColor(movieBackdropUrl);

        if (dominantColor) {
          const [r, g, b] = dominantColor.value;
          setBackdropImageDominantColor([r, g, b]);

          if (dominantColor.isLight) {
            // @ts-ignore
            movieDetailContainer?.current!.classList.remove("!text-white");
            // @ts-ignore
            movieDetailContainer?.current!.classList.add("!text-black");
          }
        }
      }
    })();
  }, [data, isLoading, movieBackdropUrl]);

  const generateMovieGenres = useCallback(() => {
    if (data && !isLoading) {
      return data.genres.map((genre) => genre.name).join(", ");
    }
  }, [data, isLoading]);

  return (
    <MainLayout>
      <div className="mb-6">
        {isLoading ? (
          <div className="flex gap-x-4">
            <Skeleton className="rounded-xl w-[140px] h-5" />
            <Skeleton className="rounded-xl w-[140px] h-5" />
          </div>
        ) : (
          <Breadcrumb
            items={[
              {
                key: "from-page",
                isLink: true,
                label: fromSearch ? "Search Results" : "Discover Movies",
                href: fromSearch ? `/search?${formattedSearchQuery}` : "/"
              },
              {
                key: "movie-detail",
                label: data?.original_title!
              }
            ]}
          />
        )}
      </div>

      <div
        className="w-full bg-auto bg-no-repeat bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${movieBackdropUrl})` }}
      >
        <div
          className="p-12 backdrop-blur"
          style={{
            background: `rgba(${[...backdropImageDominantColor, 0.7]})`
          }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="grow-0 shrink-0 self-center">
              <Skeleton
                className="rounded-2xl h-[384px] !bg-transparent"
                isLoaded={!isLoading}
              >
                <Image
                  className="w-64 shadow-2xl"
                  src={moviePosterUrl}
                  alt={`${data?.original_title} poster`}
                />
              </Skeleton>
            </div>

            <div ref={movieDetailContainer} className="py-4 !text-white w-full">
              {isLoading ? (
                <Skeleton className="!bg-transparent rounded-xl w-2/5 h-9" />
              ) : (
                <div className="flex gap-x-3 items-center">
                  <h1 className="text-3xl font-bold mb-1">
                    {data?.original_title}{" "}
                    <span className="font-normal">
                      ({dayjs(data?.release_date).year()})
                    </span>
                  </h1>

                  <RateMovie movieId={data?.id!} rating={movieRating?.rating} />
                </div>
              )}

              <p>
                {data?.release_date && (
                  <>
                    <span>{dayjs(data.release_date).format("DD/MM/YYYY")}</span>
                    <span className="px-2">•</span>
                  </>
                )}

                <span>{generateMovieGenres()}</span>

                {data?.runtime && (
                  <>
                    <span className="px-2">•</span>
                    <span>{calcTime(data.runtime)}</span>
                  </>
                )}
              </p>

              <p className="font-bold text-xl mt-8 mb-2">Overview</p>

              {isLoading ? (
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="!bg-transparent rounded-xl w-full h-4" />
                  <Skeleton className="!bg-transparent rounded-xl w-full h-4" />
                  <Skeleton className="!bg-transparent rounded-xl w-4/5 h-4" />
                </div>
              ) : (
                <>
                  <p>{data?.overview}</p>
                  <div className="flex flex-col md:flex-row gap-y-6 gap-x-32 mt-8">
                    {movieDirector && (
                      <div>
                        <p className="font-bold">{movieDirector}</p>
                        <p>Director</p>
                      </div>
                    )}
                    {movieScreenplay && (
                      <div>
                        <p className="font-bold">{movieScreenplay}</p>
                        <p>Screenplay</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <CastList castList={data?.credits?.cast || []} isLoading={isLoading} />
    </MainLayout>
  );
};
