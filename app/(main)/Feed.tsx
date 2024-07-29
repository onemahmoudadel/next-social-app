'use client'
import PostCard from '@/components/PostCard'
import { usePostQuery } from '@/features/post/queries'

export const Feed = () => {
  const {data,error,isError,isLoading} = usePostQuery()
  if(isLoading) return <h1>Loading...</h1>
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className="min-h-screen border-x  flex-grow sm:mb-0 mb-16">
      {data?.map(post=> <PostCard key={post.id} post={post}/>)}
    </div>
  )
}
