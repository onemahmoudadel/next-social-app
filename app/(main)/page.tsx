import React from 'react'
import { Button } from "@/components/ui/button"
import { logout } from '@/auth/action';

export default async function Page() {
  return (
    <div>
      Home Page
      <form action={logout}>
			  <Button variant="destructive">Sign out</Button>
		  </form>
    </div>
  )
}