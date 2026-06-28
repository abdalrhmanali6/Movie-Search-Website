import Hero from "../components/Hero"
import SlidingCards from "../components/SlidingCards"

const Home = () => {

    type section={
    id:number    
    endpoint:string
    type:string
    sectionTitle:string
     titleKey?: "title" | "name";
     language?:string
      mediaType?: "tv"| "movie"
      to:string
    }

    const sections:section[]=[
        {
        id:1,
        endpoint:"trending/all/week",
        type:"trending",
        sectionTitle:"Trending",
        to:"/trending/all"
        },
        {
        id:2,
        endpoint:"movie/now_playing?language=en-US&page=1&original_language=en",
        type:"now_playing",
        sectionTitle:"Now Playing",
        mediaType:"movie",
        to:"/movie/now_playing"
        },
         {
             id:3,
        endpoint:"movie/top_rated?language=en-US&page=1",
        type:"top-rated-movies",
        sectionTitle:"Top Rated Movies",
          mediaType:"movie",
          to:"/movie/top_rated"
        },
         {
        id:4,
        endpoint:"tv/top_rated?language=en-US&page=1",
        type:"top-rated-tv",
        sectionTitle:"Top Rated TV Show",
        titleKey:"name",
          mediaType:"tv",
          to:"/tv/top_rated"
        },
         {
        id:5,
        endpoint:"tv/popular?language=en-US&page=1",
        type:"popular-tv",
        sectionTitle:"Popular TV Show",
        titleKey:"name",
        language:"en",
        mediaType:"tv",
        to:"/tv/popular"
        },
    ]
  return (
    <div>
        <Hero endpoint="movie/now_playing?language=en-US&page=1&original_language=en" type="now-playing" titleKey="title"  mediaType="movie"/>
        {
            sections.map((section)=>(
                <SlidingCards key={section.id} endpoint={section.endpoint} sectionTitle={section.sectionTitle}
                 type={section.type}  language={section.language} mediaType={section.mediaType} to={section.to}/>
            ))
        }
    </div>
  )
}

export default Home