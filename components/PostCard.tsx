import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, HeartIcon, MessageCircle, MessageSquare, MoreHorizontalIcon } from 'lucide-react'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useLikeMutation, useUnLikeMutation } from '@/features/post/mutations';
import { startTransition } from 'react';

interface Post {
  id: string;
  LikesCount: number;
  hasLiked: boolean;
  text: string;
  image: string | null;
  createdAt: Date;
  user: {
      id: string;
      name: string;
      bio: string | null;
      coverImage: string | null;
      createdAt: Date | null;
      username: string;
      avatarUrl: string | null;
  };
}
const PostCard = ({post}:{post:Post}) => {
  const likeMutation = useLikeMutation(post.id)
  const unLikeMutation = useUnLikeMutation(post.id)
  async function handleLike() {
    startTransition(() =>{
      if (post.hasLiked) {
        unLikeMutation.mutate()
      } else {
        likeMutation.mutate()
      }
    })
  }
  return (
    <div className='flex gap-2 border-b p-4'>
      <Link href={`/u/${post.user.username}`} className="">
        <Avatar className='size-12' >
          <AvatarImage  src={post.user.avatarUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>{post.user.name.slice(0,2)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className=''>
            <Link  href={`/u/${post.user.username}`} className='flex flex-col sm:flex-row gap-1'>
              <p className='font-medium'>{post.user.name}</p>
              <span className='text-muted-foreground'>@{post.user.username}</span>
            </Link>
            <Link  href={`/p/${post.id}`} className='text-muted-foreground text-sm'>{new Date(post.createdAt).toDateString()}</Link>
          </div>
          <Button className='flex gap-1' size="icon" variant="ghost">
            <MoreHorizontalIcon className='size-5' />
          </Button>
        </div>
        <article className='py-2'>
          <p className='whitespace-pre-line break-words'>{post.text}</p>
          {post.image && (
            <div className='aspect-square relative'>
              <Image src={post.image} alt={post.text} fill  />
            </div>
          )}
        </article>

        <div className='flex gap-4 items-center'>
          <button onClick={handleLike} className='items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:text-rose-600 disabled:pointer-events-none disabled:opacity-50 hover:text-rose-500  py-1 flex gap-1' >
            <HeartIcon className={cn("size-5",post.hasLiked && "fill-rose-500 stroke-none")} />
            {post.LikesCount} likes
          </button>

          <button className='items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:text-sky-600 disabled:pointer-events-none disabled:opacity-50 hover:text-sky-500  py-1 flex gap-1' >
            <MessageSquare className='size-5' />
            {/* {post.comments}  */}
            0 comments
          </button>
          <div className='flex-grow' />
          <Button className='flex gap-1' size="icon" variant="ghost">
            <Bookmark className={cn("size-5",false && "fill-sky-500 stroke-none")} />
          </Button>
        </div>
      </div>
  </div>
  )
}

export default PostCard