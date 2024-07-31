import { useIsMutating, useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost,likePost,unLikePost } from "./actions"
import { Post } from "./interfaces"


export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<Post[]>(['posts'])
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
    onError: (err, {text}, context) => {
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      queryClient.setQueryData(['posts'], context?.previousData)
    },
  })
}

export const useLikeMutation = (postId:string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['like',postId]
  const isLikeMutating = useIsMutating({mutationKey})
  const mutation = useMutation({
    mutationFn: ()=> likePost({postId}),
    mutationKey,
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<Post[]>(['posts'])
      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (oldData:Post[]) => {
        const post = oldData.find((post)=> post.id === postId) as Post
        const postIdx = oldData.indexOf(post)
        oldData[postIdx].hasLiked = true
        oldData[postIdx].LikesCount += 1
        return oldData
      })
      // Return a context object with the snapshotted value
      return { previousData }
    },
    onSuccess: async (postFormServer,{},context) => {
    },
    onError: (err, {}, context) => {
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      console.log('❌ Filed UnLike 👍');
      queryClient.setQueryData(['posts'], context?.previousData)
    },
  }
  )
return {...mutation,isLikeMutating}
}

export const useUnLikeMutation = (postId:string) => {
  const queryClient = useQueryClient()
  const mutationKey = ['unLike',postId]
  const isUnLikeMutating = useIsMutating({mutationKey})
  const mutation = useMutation({
    mutationFn: () => unLikePost({postId}),
    mutationKey:['UnLike'],
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<Post[]>(['posts'])
      // Optimistically update to the new value
      queryClient.setQueryData(['posts'], (oldData:Post[]) => {
        const post = oldData.find((post)=> post.id === postId) as Post
        const postIndex = oldData.indexOf(post)
        oldData[postIndex].hasLiked = false
        oldData[postIndex].LikesCount -= 1
        return oldData
      })
      // Return a context object with the snapshotted value
      return { previousData }
    },
    onSuccess: async (postFormServer,{},context) => {
    },
    onError: (err, {}, context) => {
      console.log('❌ Filed Like 👍');
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      queryClient.setQueryData(['posts'], context?.previousData)
    },
  })

  return {...mutation,isUnLikeMutating}
}
