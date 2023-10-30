import { atomWithStorage } from "jotai/utils";
import { MovieRatingForStorage } from "@/types";

export const movieRatingListAtom = atomWithStorage<MovieRatingForStorage[]>(
  "movie-rating-list",
  []
);
