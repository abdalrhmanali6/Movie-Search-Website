import { useEffect, useState } from "react"


const useDebounce=<T>(value:T)=>{
    const [debounceValue,setDebounceValue]=useState<T>(value)

    useEffect(()=>{
     const timer=setTimeout(()=>{
        setDebounceValue(value)
     },300)
     return ()=>clearTimeout(timer)
    },[value])
    return debounceValue
}

export default useDebounce