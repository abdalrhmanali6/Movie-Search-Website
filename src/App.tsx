import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home.tsx"
import Movies from "./pages/Movies.tsx"
import TvShow from "./pages/TvShow.tsx"
import MediaDetails from "./pages/MediaDetails.tsx"
import SearchResults from "./pages/SearchResults.tsx"
import MoreData from "./pages/MoreData.tsx"
import Trending from "./pages/Trending.tsx"
import Geners from "./pages/Geners.tsx"
import Discovery from "./pages/Discovery.tsx"
import NotFound from "./pages/NotFound.tsx"

function App() {


  return (
    <Routes>
      <Route path="/"  element={<MainLayout/>}>
       <Route index element={<Home/>} />  
       <Route path="movie" element={<Movies/>} />  
       <Route path="tv" element={<TvShow/>} />
       <Route path="/:mediaType/:title/:id"  element={<MediaDetails/>}/>
       <Route path="/:mediaType/SearchResult" element={<SearchResults/>}/>
       <Route path="/:media_Type/:type" element={<MoreData/>}/>
       <Route path="/trending/:media_Type" element={<Trending/>}/>
       <Route path="/:media_Type/genere/:genre/:id" element={<Geners/>}/>
       <Route path="/discovery" element={<Discovery/>}/>
       <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}

export default App
