export type CommonListResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type DiscoverMoviesQueryParams = {
  page?: number;
  sort_by?: SortBy;
};

export type SearchMoviesQueryParams = {
  page?: number;
  query: string;
};

export type MovieListResponse = CommonListResponse & {
  results: MovieListItem[];
};

export type MovieListItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetailsResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type CommonPeople = {
  adult: boolean;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type MovieCast = CommonPeople & {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type MovieCrew = CommonPeople & {
  department: string;
  job: string;
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type SortBy = "popularity.asc" | "popularity.desc";

export type MovieRatingForStorage = {
  movieId: number;
  rating: number;
};
