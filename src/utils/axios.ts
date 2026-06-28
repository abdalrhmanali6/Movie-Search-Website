import axios from "axios";


const Api=axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    }
})

export default Api;