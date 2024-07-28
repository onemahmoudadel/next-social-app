import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import PostCard from '@/components/PostCard'

const posts = [
  {
    id:1,
    text:'Docker is lightweight, they said 🙈',
    user:{
      avatar:'https://pbs.twimg.com/profile_images/1757317042644918272/z22hY3Ji_400x400.jpg',
      name:'Ryan Els',
      username:'RyanEls4'
    },
    createAt:'3 min ago',
    likes:6,
    comments:18,
    hasLiked:true,
    hasBookmarked:true,
    img:"https://pbs.twimg.com/media/GTZyJPoXYAACJGH?format=jpg&name=900x900"
  },

  {
    id:3,
    text:'Who remembers?',
    user:{
      avatar:'https://pbs.twimg.com/profile_images/1774013136888070144/Cd-kT_Cb_400x400.jpg',
      name:'NO CONTEXT HUMANS',
      username:'HumansNoContext'
    },
    createAt:'12 min ago',
    likes:279,
    comments:64,
    hasLiked:true,
    hasBookmarked:false,
    img:'https://pbs.twimg.com/media/GTmzrwuXAAASLoq?format=jpg&name=900x900'
  },
  {
    id:2,
    text:'Anyone with less kids than you have doesn’t know anything.',
    user:{
      avatar:'https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg',
      name:'Adam Wathan',
      username:'adamwathan'
    },
    createAt:'38 min ago',
    likes:61,
    comments:7,
    hasLiked:false,
    hasBookmarked:false,
    img:null
  },
  {
    id:4,
    text:'Body text for a post. Since it’s a social app, sometimes it’s a hot take, and sometimes it’s a question.',
    user:{
      avatar:'',
      name:'Mark Rojas',
      username:'markr5'
    },
    createAt:'2 hrs ago',
    likes:85,
    comments:44,
    hasLiked:true,
    hasBookmarked:true,
    img:null
  },
]
export default async function Page() {
  return (
    <div className='flex '>
      <div className="min-h-screen border-x  flex-grow sm:mb-0 mb-16">

        {posts.map(post=> <PostCard key={post.id} post={post}/>)}

      </div>
      <div className="hidden lg:block h-screen sticky top-0 w-1/3 min-w-72 max-w-80 p-4 bg-green-200">
      <ScrollArea className="h-screen px-4 border rounded-sm bg-white">
        Suggested people
        <ul className='space-y-4'>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </ScrollArea>
      </div>
    </div>
  )
}