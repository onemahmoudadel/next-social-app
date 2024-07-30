'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/auth/action"
import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import Link from "next/link"

const UserButton = ({user}:{user:User}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hidden sm:flex h-auto gap-2 w-full" variant="ghost">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{user.name.slice(0,2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="">{user.name}</h3> 
            <span className="text-sm text-muted-foreground">@{user.username}</span> 
          </div>
        </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 mx-4" >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="flex gap-2" href={`/u/${user.username}`}>
              <User2Icon className="size-5 stroke-muted-foreground" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem  asChild>
            <Link className="flex gap-2" href="/settings">
              <SettingsIcon className="size-5 stroke-muted-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async ()=> await logout()} className="group flex gap-2 focus:text-destructive-foreground focus:bg-destructive/90">
            <LogOutIcon className="size-5 stroke-muted-foreground group-focus:stroke-destructive-foreground" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton