import axios from "axios";
import Api from "../utils/axios.ts";
import { useQuery } from "@tanstack/react-query";



const fetchData=async<T>(endpoint:string):Promise<T>=>{
    try{
        const res=await Api.get<T>(endpoint)
        return res.data
    }catch(e){
        if(axios.isAxiosError(e)){
              throw e.response?.data || e.message;
        }
        throw e
    }
}

type UseFetchQueryProps ={
    keys:string[]
    endpoint:string
}

const useFetchDataQuery=<T>({keys,endpoint}:UseFetchQueryProps)=>{
  return useQuery<T>({
    queryKey:[...keys,endpoint],
    queryFn:()=>fetchData<T>(endpoint),
  })
}

export default useFetchDataQuery