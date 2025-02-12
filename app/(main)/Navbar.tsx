'use client'
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucia"


import UserButton from "@/components/UserButton"

const Navbar = ({user}:{user:User}) => {
  const pathname = usePathname()
  return (
    <nav className='backdrop-blur bottom-0 fixed sm:sticky h-auto sm:h-screen sm:top-0  w-full sm:w-auto  border-t sm:border-none gap-1 flex-row flex sm:flex-col items-center p-2 bg-primary-foreground/70 sm:bg-primary-foreground justify-between sm:justify-start z-50'>
      
      <Link className="hidden sm:inline-flex w-full" href='/'>
          <h1 className="p-4 text-xl font-semibold tracking-tight">Social app</h1>
      </Link>

      <Button asChild variant="ghost">
        <Link href="/" className={cn("h-auto gap-2 font-medium w-full",pathname === '/' && 'sm:bg-accent sm:text-accent-foreground')} >
          {pathname === "/" ? <Icons.homeActive className="size-6" /> : <Icons.home className="size-6" />}
          <span className="sr-only sm:not-sr-only sm:flex-1 ">Home</span> 
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/search" className={cn("h-auto gap-2 font-medium w-full",pathname === '/search' && 'sm:bg-accent sm:text-accent-foreground')} >
          {pathname === "/search" ? <Icons.searchActive className="size-6" /> : <Icons.search className="size-6" />}
          <span className="sr-only sm:not-sr-only sm:flex-1 ">Search</span> 
        </Link>
      </Button>
      <Button  onClick={()=>console.log("TODO: open new post model")} variant="ghost" className="sm:hidden h-auto gap-2 font-medium w-full" >
        <Icons.addPost className="size-6" />
        <span className="sr-only">New Post</span> 
      </Button>

      <Button asChild variant="ghost">
        <Link href="/notifications" className={cn("h-auto gap-2 font-medium w-full",pathname === '/notifications' && 'sm:bg-accent sm:text-accent-foreground')} >
          {pathname === "/notifications" ? <Icons.notificationsActive className="size-6" /> : <Icons.notifications className="size-6" />}
          <span className="sr-only sm:not-sr-only sm:flex-1 ">Notifications</span> 
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href={`/u/${user.username}`} className="sm:hidden h-auto gap-2 w-full p-0" >
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{user.name.slice(0,2)}</AvatarFallback>
          </Avatar>
          <span className="sr-only">{user.name} Profile</span> 
        </Link>
      </Button>

          <Button asChild variant="ghost">
            <Link href="/savedposts" className={cn("hidden sm:inline-flex h-auto gap-2 font-medium w-full",pathname === '/savedposts' && 'sm:bg-accent sm:text-accent-foreground')} >
              {pathname === "/savedposts" ? <Icons.bookmarkActive className="size-6" /> : <Icons.bookmark className="size-6" />}
              <span className="flex-1">Saved posts</span> 
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/messages" className={cn("hidden sm:inline-flex h-auto gap-2 font-medium w-full",pathname === '/messages' && 'bg-accent text-accent-foreground')} >
            {pathname === "/messages" ? <Icons.messageActive className="size-6" /> : <Icons.message className="size-6" />}
            <span className="flex-1 ">Messages</span> 
            </Link>
          </Button>

      <div className="flex-grow"></div>
      <UserButton user={user} />

    </nav>
  )
}
export default Navbar

