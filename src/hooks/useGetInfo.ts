import { useEffect, useState } from "react";


const useGetAnime=<T,>(url:RequestInfo | URL):[T | null,boolean,unknown|null] => {


    const [anime, setAnime] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown |null>()

    

    useEffect(() => {

        const fetchanime=async()=>{
            try {
                setLoading(true)
                const options = {
                    method: 'GET'
                }
    
                const response = await fetch(url,options)
                const data = await response.json()
    
                setAnime(data)
            }
            catch (error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
    
        }

         fetchanime();


    }, [url])

    return [anime,loading,error] 

}



export default useGetAnime;