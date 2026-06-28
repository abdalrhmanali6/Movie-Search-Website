import useFetchDataQuery from "../../hooks/useFetchQuery";
import type { FullCast } from "../../types/types";

type OverviewMovieProps = {
  overview: string;
  id: string;
};

const OverviewMovie = ({ overview, id }: OverviewMovieProps) => {
  const { data: cast, isLoading } = useFetchDataQuery<FullCast>({
    endpoint: `movie/${id}/credits?language=en-US'`,
    keys: ["cast", id],
  });

  if (!cast) {
    return <h1>Invaild URL</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;

  const actors = cast.cast;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-headline-lg text-headline-lg border-l-4 border-primary-container pl-4">
          Overview
        </h3>
        <p className="font-body-md text-on-surface-variant leading-relaxed max-w-4xl">
          {overview}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-headline-lg text-headline-lg border-l-4 border-primary-container pl-4">
          Lead Cast
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {actors.slice(0, 4).map((actor) => (
            <div key={actor.credit_id} className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-primary-container/30 transition-transform group-hover:scale-110">
                <img
                  alt={actor.name}
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                />
              </div>
              <div>
                <p className="font-body-md text-on-surface">
                  {actor.character}
                </p>
                <p className="text-on-surface-variant text-label-sm">
                  {actor.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewMovie;
