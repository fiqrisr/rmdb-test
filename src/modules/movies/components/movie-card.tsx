import { Card, CardHeader, CardFooter, Chip, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import dayjs from "dayjs";
import { useAtomValue } from "jotai/index";

import { BASE_TMDB_IMAGE_URL, MOVIE_POSTER_SIZE } from "@/configs";
import { movieRatingListAtom } from "../atoms";

export type MovieCardProps = {
  id: number;
  name: string;
  posterPath: string;
  releaseDate: Date;
  vote: number;
};

export const MovieCard = ({
  id,
  name,
  posterPath,
  releaseDate,
  vote
}: MovieCardProps) => {
  const movieRatingList = useAtomValue(movieRatingListAtom);
  const movieRating = movieRatingList.find((rating) => rating.movieId === id);

  return (
    <div>
      <Card
        isFooterBlurred
        className="relative w-full h-64 mb-3 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
      >
        {movieRating && (
          <div className="absolute w-full text-white top-0 z-40 px-4 py-2">
            <div className="rounded-xl bg-black/70 backdrop-blur text-center py-1">
              Your rating: {movieRating.rating}
            </div>
          </div>
        )}
        <Image
          removeWrapper
          src={
            posterPath
              ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${posterPath}`
              : "/no_image.jpg"
          }
          alt={`${name} poster`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="w-full flex justify-between">
            <Chip
              color="secondary"
              startContent={<FaStar size={16} className="mx-1" />}
            >
              <span className="font-medium">{vote}</span>
            </Chip>
            <p className="font-medium text-white">
              {releaseDate
                ? dayjs(releaseDate).format("MMM YYYY")
                : "Unknown date"}
            </p>
          </div>
        </CardFooter>
      </Card>
      <p className="font-medium text-lg text-black dark:text-white">{name}</p>
    </div>
  );
};
