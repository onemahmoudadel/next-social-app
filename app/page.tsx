import React from 'react'
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import { logout } from '@/auth/action';

export default async function Page() {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
  return (
    <div>
      Home Page
      <h1>Hi, {user.name}!</h1>
      <form action={logout}>
			  <Button variant="destructive">Sign out</Button>
		  </form>
      <Button>Click me</Button>
    </div>
  )
}