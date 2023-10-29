export type CommonListResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type DiscoverMoviesQueryParams = {
  page?: number;
  sort_by?: SortBy;
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

export type SortBy = "popularity.asc" | "popularity.desc";
