import { useRouter } from "next/router";
import { Button, Spinner } from "@nextui-org/react";
import { MdSearchOff } from "react-icons/md";

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

      {data?.pages && data?.pages[0].results.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-20">
          <MdSearchOff size={200} />
          <p className="text-lg font-medium">No results to show</p>
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
