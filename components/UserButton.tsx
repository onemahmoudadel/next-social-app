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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

const UserButton = ({user}:{user:User}) => {
  const [open,setOpen] = useState(false)
  const { theme,setTheme } = useTheme()

  return (
    <>
      <DropdownMenu open={open}  onOpenChange={()=> setOpen(false)}>
      <DropdownMenuTrigger>
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
            <DropdownMenuItem asChild>
              <Link className="flex gap-2" href="/settings">
                <SettingsIcon className="size-5 stroke-muted-foreground" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e)=> e.preventDefault()} asChild >
              <Label htmlFor="airplane-mode" className="flex gap-2" >
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
                <span>Theme</span>
                <DropdownMenuShortcut>
                  <Switch defaultChecked={theme === "light" ? true : false} onCheckedChange={()=>setTheme(theme === "light" ? "dark" :"light")} id="airplane-mode" />
                </DropdownMenuShortcut>
              </Label>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={async ()=> await logout()} className="group flex gap-2 focus:text-destructive-foreground focus:bg-destructive/90">
              <LogOutIcon className="size-5 stroke-muted-foreground group-focus:stroke-destructive-foreground" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={()=>setOpen(true)} className="hidden sm:flex h-auto gap-2 w-full" variant="ghost">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user.name.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="">{user.name}</h3> 
          <span className="text-sm text-muted-foreground">@{user.username}</span> 
        </div>
      </Button>
      </>
  )
}

export default UserButton