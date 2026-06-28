import Hero from '../components/Hero'
import SlidingCards from '../components/SlidingCards'

const TvShow = () => {
 type section={
    id:number    
    endpoint:string
    type:string
    sectionTitle:string
     titleKey?:"name";
     language?:string
     to:string
    }

    const sections:section[]=[
        
        {
        id:1,
        endpoint:"tv/on_the_air?language=en-US&page=1",
        type:"on-air-tv",
        sectionTitle:"ON THE AIR",
        titleKey:"name",
        to:"/tv/on_the_air"
        },
        {
        id:2,
        endpoint:"tv/airing_today?with_original_language=en",
        type:"airing-today-tv",
        sectionTitle:"Airing Today",
        titleKey:"name",
        to:"/tv/airing_today"
        },
         {
        id:3,
        endpoint:"tv/top_rated?language=en-US&page=1",
        type:"top-rated-tv",
        sectionTitle:"Top Rated",
        titleKey:"name",
          to:"/tv/top_rated"
        },
         {
        id:4,
        endpoint:"trending/tv/week",
        type:"trending-tv",
        sectionTitle:"Trending",
          to:"/trending/tv"
        },
         {
        id:5,
        endpoint:"discover/tv?with_genres=10759&sort_by=popularity.desc",
        type:"action-tv",
        sectionTitle:"Action",
        language:"en",
        to:"/tv/genere/action/10759"
        },
         {
        id:6,
        endpoint:"discover/tv?with_genres=35&sort_by=popularity.desc",
        type:"comedy-movies",
        sectionTitle:"Comedy",
        language:"en",
          to:"/tv/genere/comedy/35"
        },
         {
        id:7,
        endpoint:"discover/tv?with_genres=80&sort_by=popularity.desc",
        type:"crime-tv",
        sectionTitle:"Crime",
        language:"en",
         to:"/tv/genere/crime/80"
        },
    ]

    const mediaType:"tv"|"movie"="tv"
  return (
    <div>
        <Hero endpoint="tv/on_the_air?language=en-US&page=1" type="on-air-tv" titleKey="name" mediaType={mediaType}/>
        {
            sections.map((section)=>(
                <SlidingCards key={section.id} endpoint={section.endpoint} sectionTitle={section.sectionTitle}
                 type={section.type} titleKey={section.titleKey} language={section.language} mediaType={mediaType} to={section.to}/>
            ))
        }
    </div>
  )
}

export default TvShow