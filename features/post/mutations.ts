import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "./actions"
import { Post } from "./interfaces"


export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['posts'])
      // Return a context object with the snapshotted value
      return {
        previousData
      }
    },
    onSuccess: async (postFormServer) => {
      // add the new value to existing data with out fetch all
      queryClient.setQueryData(['posts'], (oldData:Post[]) => {
        return [postFormServer,...oldData]
      })
    },
    onError: (err, MutateData, context) => {
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      queryClient.setQueryData(['posts'], context?.previousData)
    },
  })
}