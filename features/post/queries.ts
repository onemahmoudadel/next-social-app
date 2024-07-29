import { useQuery } from "@tanstack/react-query";
import { PostResponse } from "./interfaces";


// const queryClient = new QueryClient()

export const usePostQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async ()=>{
      const res = await fetch('http://localhost:3000/api/post')
      if (!res.ok) throw new Error("Something went wrong!") 
      const result: PostResponse= await res.json()
      return result.data
    }
  })
}