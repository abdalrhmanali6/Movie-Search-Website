import { ArrowDown } from "lucide-react";
import useSearchMedia from "../hooks/useSearchMedia";
import SearchCard from "../components/search/SearchCard";
import StateMessage from "../components/StateMessage";
import { getErrorMessage } from "../utils/error";

const SearchResults = () => {
  const { results,media_Types , search, data, isLoading,fetchNextPage,isFetchingNextPage,hasNextPage,isError,error,refetch} = useSearchMedia();
  
  if (isLoading) {
    return (
      <>
      <header className="mb-10">
          <h1 className="bg-white/10 animate-pulse shrink-0 w-60 h-10  rounded-xl-full mt-10 mb-2">
           
          </h1>
          <p className="bg-white/10 animate-pulse shrink-0 w-80 h-5 rounded-xl-full">
          </p>
        </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-gutter">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 rounded-xl bg-white/10 animate-pulse shrink-0"
            />
          ))}
      </div>
      </>
    );
  }

  if (isError) {
    return (
      <StateMessage
        variant="error"
        title="Search failed"
        message={getErrorMessage(error)}
        actionLabel="Try Again"
        onAction={() => void refetch()}
        className="min-h-[70vh]"
      />
    );
  }

  if (!data || data.pages.length === 0 || results.length === 0) {
    return (
      <StateMessage
        title="No results found"
        message={`No ${media_Types} results matched "${search ?? ""}". Try another search.`}
        className="min-h-[70vh]"
      />
    );
  }
  return (
    <div className="pt-15 pb-12 px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row gap-gutter">
      <main className="flex-1">
        <header className="mb-10">
          <h1 className="font-display-lg text-display-lg text-white mb-2">
            Results for <span className="text-primary">{search}</span>
          </h1>
          <p className="text-on-surface-variant font-body-md">
            {data.pages[0]?.total_results} {media_Types} found that match your immersive
            criteria.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-gutter">
          {results?.map((media,) => (
            <SearchCard key={media.id} media={media} media_Types={media_Types} />
          ))}
        </div>
        {
         hasNextPage &&
        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-3 bg-surface-container-high border border-white/10 px-10 py-4 rounded-full font-label-sm text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          onClick={()=>fetchNextPage()}>
             {isFetchingNextPage? "Loading...":
             <>
              LOAD MORE
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
              <ArrowDown />
            </span>
             </> 
             }
          </button>
        </div>
        }
      </main>
    </div>
  );
};

export default SearchResults;
