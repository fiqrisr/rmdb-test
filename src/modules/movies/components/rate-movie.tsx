import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent
} from "@nextui-org/react";
import { Rating } from "react-simple-star-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAtom } from "jotai";
import { movieRatingListAtom } from "../atoms";

type RateMovieProps = {
  movieId: number;
  rating: number | undefined;
};

export const RateMovie = ({ movieId, rating }: RateMovieProps) => {
  const [movieRatingList, setMovieRatingList] = useAtom(movieRatingListAtom);

  const handleRating = (value: number) => {
    let tempArr = [...movieRatingList];
    const existingMovieRatingIndex = tempArr.findIndex(
      (rating) => rating.movieId === movieId
    );

    if (existingMovieRatingIndex !== -1) {
      tempArr[existingMovieRatingIndex] = {
        movieId,
        rating: value
      };
    } else {
      tempArr = [
        ...tempArr,
        {
          movieId,
          rating: value
        }
      ];
    }

    setMovieRatingList([...tempArr]);
  };

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button isIconOnly size="sm" title="Rate movie">
          {rating ? <AiFillStar size={18} /> : <AiOutlineStar size={18} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Rating
          emptyStyle={{ display: "flex" }}
          SVGstyle={{ display: "inline-block" }}
          initialValue={rating ?? 0}
          allowFraction
          onClick={handleRating}
        />
      </PopoverContent>
    </Popover>
  );
};
