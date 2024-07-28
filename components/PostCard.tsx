import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, HeartIcon, MessageCircle, MessageSquare, MoreHorizontalIcon } from 'lucide-react'
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Post {
  id:number,
  text: string;
  user: {
      name: string;
      username: string;
      avatar :string|null;

  };
  createAt: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
  hasBookmarked: boolean;
  img: string|null;
}
const PostCard = ({post}:{post:Post}) => {
  return (
    <div className='flex gap-2 border-b p-4'>
    <Link href={`/u/${post.user.username}`} className="">
      <Avatar className='size-12' >
        <AvatarImage  src={post.user.avatar || "https://github.com/shadcn.png"} />
        <AvatarFallback>{post.user.name.slice(0,2)}</AvatarFallback>
      </Avatar>
    </Link>
    <div className="flex-1">
      <div className="flex justify-between">
        <div>
          <Link  href={`/u/${post.user.username}`} className='flex gap-1'>
            <p className='font-medium'>{post.user.name}</p>
            <span className='text-muted-foreground'>@{post.user.username}</span>
          </Link>
          <Link  href={`/p/${post.id}`} className='text-muted-foreground text-sm'>{post.createAt}</Link>
        </div>
        <Button className='flex gap-1' size="icon" variant="ghost">
          <MoreHorizontalIcon className='size-5' />
        </Button>
      </div>
      <article className='py-2'>
        <p>{post.text}</p>
        {post.img && (
          <div className='aspect-square relative'>
            <Image src={post.img} alt={post.text} fill  />
          </div>
        )}
      </article>

      <div className='flex gap-4 items-center'>
        <button className='items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:text-rose-600 disabled:pointer-events-none disabled:opacity-50 hover:text-rose-500  py-1 flex gap-1' >
          <HeartIcon className={cn("size-5",post.hasLiked && "fill-rose-500 stroke-none")} />
          {post.likes} likes
        </button>

        <button className='items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:text-sky-600 disabled:pointer-events-none disabled:opacity-50 hover:text-sky-500  py-1 flex gap-1' >
          <MessageSquare className='size-5' />
          {post.comments} comments
        </button>
        <div className='flex-grow' />
        <Button className='flex gap-1' size="icon" variant="ghost">
          <Bookmark className={cn("size-5",post.hasBookmarked && "fill-sky-500 stroke-none")} />
        </Button>
      </div>
    </div>
  </div>
  )
}

export default PostCard