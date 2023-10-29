import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import { BASE_TMDB_IMAGE_URL, MOVIE_BACKDROP_SIZE } from "@/configs";

export type HeroCarouselProps = {
  slideList: Array<{
    movieId: number;
    movieName: string;
    movieDescription: string;
    backdropPath: string;
  }>;
};

export const HeroCarousel = ({ slideList }: HeroCarouselProps) => {
  return (
    <Swiper
      className="mt-10 mb-20 shadow-2xl"
      centeredSlides
      loop
      loopAdditionalSlides={3}
      effect="cards"
      cardsEffect={{
        rotate: false,
        perSlideOffset: 15
      }}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false
      }}
      initialSlide={Math.floor(Math.random() * 8)}
      modules={[Autoplay, EffectCards]}
    >
      {slideList.map((slide) => (
        <SwiperSlide key={slide.movieId}>
          <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
          <img
            src={`${BASE_TMDB_IMAGE_URL}/${MOVIE_BACKDROP_SIZE}/${slide.backdropPath}`}
            alt={`${slide.movieName} backdrop image`}
            loading="lazy"
          />
          <div className="absolute bottom-0 px-6 mb-6 text-white">
            <p className="text-2xl mb-3 font-bold">{slide.movieName}</p>
            <p>{slide.movieDescription}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
