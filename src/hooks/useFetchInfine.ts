import axios from "axios";
import Api from "../utils/axios.ts";
import { useInfiniteQuery} from "@tanstack/react-query";



const FetchInfine=async<T>(endpoint:string):Promise<T>=>{
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

type useFetchInfineProps ={
    keys:string[]
    endpoint:string
}


const useFetchInfine = <T extends { page: number; total_pages: number }>(
  { keys, endpoint }: useFetchInfineProps
) => {
  return useInfiniteQuery({
    queryKey: [...keys],
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      FetchInfine<T>(`${endpoint}&page=${pageParam}`),

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined,
  });
};

export default useFetchInfine