import { useRouter } from "next/router";
import { Button, Spinner } from "@nextui-org/react";

import { MainLayout } from "@/layouts";
import { useGetSearchMoviesQuery } from "../hooks/use-get-search-movies";
import { MovieList } from "../components/movie-list";

export const SearchPage = () => {
  const { query } = useRouter();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetSearchMoviesQuery({
      queryParams: {
        query: query.q as string
      }
    });

  return (
    <MainLayout>
      <h1 className="font-bold text-4xl mt-4 mb-8">
        Showing results for &quot;{query.q}&quot;
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center my-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}

      <div className="flex flex-col gap-y-8">
        {data?.pages?.map((page) => (
          <MovieList
            key={page.page}
            movieList={page?.results ?? []}
            isSearchPage
          />
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
