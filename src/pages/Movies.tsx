import Hero from "../components/Hero"
import SlidingCards from "../components/SlidingCards"

const Movies = () => {
   type section={
    id:number    
    endpoint:string
    type:string
    sectionTitle:string
     titleKey?: "title" | "name";
     language?:string
      to:string
    }

    const sections:section[]=[
        
        {
        id:1,
        endpoint:"movie/now_playing?language=en-US&page=1&original_language=en",
        type:"now-playing",
        sectionTitle:"Now Playing",
        to:"/movie/now_playing"
        },
        {
        id:2,
        endpoint:"trending/movie/week",
        type:"trending-movie",
        sectionTitle:"Trending",
        to:"/trending/movie"
        },
         {
        id:3,
        endpoint:"movie/top_rated?language=en-US&page=1",
        type:"top-rated-movies",
        sectionTitle:"Top Rated Movies",
         to:"/movie/top_rated"
        },
         {
        id:4,
        endpoint:"movie/upcoming?language=en-US&page=1",
        type:"upcoming-movies",
        sectionTitle:"Upcoming",
         to:"/movie/upcoming"
        },
         {
        id:5,
        endpoint:"discover/movie?with_genres=28&sort_by=popularity.desc",
        type:"action-movies",
        sectionTitle:"Action",
        language:"en",
         to:"/movie/genere/action/28"
        },
         {
        id:6,
        endpoint:"discover/movie?with_genres=16&sort_by=popularity.desc",
        type:"Animation-movies",
        sectionTitle:"Animation",
        language:"en",
         to:"/movie/genere/animation/16"
        },
         {
        id:7,
        endpoint:"discover/movie?with_genres=27&sort_by=popularity.desc",
        type:"Horror-movies",
        sectionTitle:"Horror",
        language:"en",
         to:"/movie/genere/horror/27"

        },
    ]

    const mediaType:"tv"|"movie"="movie"
  return (
    <div>
        <Hero endpoint="movie/now_playing?language=en-US&page=1&original_language=en" type="now-playing" titleKey="title" mediaType={mediaType}/>
        {
            sections.map((section)=>(
                <SlidingCards key={section.id} endpoint={section.endpoint} sectionTitle={section.sectionTitle}
                 type={section.type}  language={section.language} mediaType={mediaType} to={section.to}/>
            ))
        }
    </div>
  )
}

export default Movies