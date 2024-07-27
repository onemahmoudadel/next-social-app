'use client'

import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRouter } from 'next/navigation'

import { signup } from '@/auth/action'
import { signUpSchema, type SignUpSchema } from '@/auth/schemas'

import { toast } from "sonner"


export const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      password:"",
      confirm:"",
    },
  })
   async function onSubmit(values: SignUpSchema) {
    await signup(values)
    .then((result) => {
      console.log(result);
      if (!result.success) {
        toast.error(result.error.toString())
        throw new Error(result.error.toString())
      }
    })

  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="grid gap-4">
          <div className="grid gap-1">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Max Robinson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div className="grid gap-1">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <div className="grid gap-1">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <div className="grid gap-1">
            <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href='/login/github'>
              Login with Github
            </Link>
        </Button>
        </div>
    </form>
  </Form>
  <div className="mt-4 text-center text-sm">
    Already have an account?{" "}
    <Link href="/login" className="underline">
      Sign in
    </Link>
  </div>
  </>
  )
}
