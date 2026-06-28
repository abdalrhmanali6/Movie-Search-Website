import useFetchDataQuery from "../../hooks/useFetchQuery";
import type { FullCast, tvDetails } from "../../types/types";

type OverviewTvProps = {
  id: string;
  media: tvDetails;
};

const OverviewTv = ({ id, media }: OverviewTvProps) => {
  const { data: cast, isLoading } = useFetchDataQuery<FullCast>({
    endpoint: `tv/${id}/credits?language=en-US'`,
    keys: ["cast", id],
  });

  if (!cast) {
    return <h1>Invaild URL</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;

  const actors = cast.cast;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-12">
        <section className="glass-panel p-8 rounded-2xl">
          <h3 className="font-headline-lg text-headline-lg mb-4 text-primary">
            Overview
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {media.overview}
          </p>
        </section>
        <section className="space-y-6 mt-12">
          <h3 className="font-headline-lg text-headline-lg border-l-4 border-primary-container pl-4 text-white">
            Lead Cast
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {actors.map((actor) => (
              <div
                key={actor.credit_id}
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-primary-container/30 transition-transform group-hover:scale-110">
                  <img
                    alt={actor.name}
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  />
                </div>

                <div>
                  <p className="font-body-md text-on-surface font-bold">
                    {actor.character}
                  </p>
                  <p className="text-on-surface-variant text-label-sm">
                    {actor.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-white">
                Seasons
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
               {media.number_of_seasons} •  {media.number_of_episodes} Episodes total
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
                media.seasons.map((season)=>(
            <div className="group cursor-pointer">
              <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 border border-white/5 transition-transform duration-500 group-hover:scale-95">
                <img
                  className="w-full h-full object-cover"
                  data-alt="The official season 8 poster of Game of Thrones, featuring a dark, frosty background with the Iron Throne fused with dragons. The lighting is cold with indigo highlights, emphasizing the high-fidelity cinematic quality of the final season's promotional art."
                  src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                />
              </div>
              <h4 className="font-body-md text-body-md font-bold text-white group-hover:text-primary transition-colors">
                {season.name}
              </h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {season.episode_count} Episodes • {season.air_date}
              </p>
            </div>
                ))
            }
          </div>
        </section>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
          <div>
            <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">
              Original Network
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-fit h-12 ">
                <img
                  alt={media.networks[0]?.name}
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w185${media.networks[0]?.logo_path}`}
                />
              </div>
              <span className="font-headline-md text-white">
                {media.networks[0]?.name}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl">
              <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                Seasons
              </h4>
              <p className="font-headline-lg text-headline-lg text-primary">
                {media.number_of_seasons}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                Episodes
              </h4>
              <p className="font-headline-lg text-headline-lg text-primary">
                 {media.number_of_episodes}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">
              Created By
            </h4>
            <div className="flex flex-col gap-4">
                {
                media.created_by.map((creator)=>(
              <div key={creator.credit_id} className="flex items-center gap-4 group">
                <div  className="w-14 h-14 rounded-full overflow-hidden border border-primary/20 group-hover:border-primary transition-colors">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A portrait of David Benioff, television writer and producer, in a professional and thoughtful pose. The lighting is low-key with sharp highlights, consistent with a high-end cinematic noir aesthetic featuring deep shadows and cool blue tones."
                    src={`https://image.tmdb.org/t/p/w185${creator.profile_path}`}
                  />
                </div>
                <div>
                  <p className="font-body-md text-white font-bold">
                    {creator.name}
                  </p>
                </div>
              </div>

                ))
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTv;
