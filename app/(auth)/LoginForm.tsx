'use client'

import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ZodError } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from '@/auth/action'
import { type LoginSchema, loginSchema } from '@/auth/schemas'
import { toast } from 'sonner'



export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password:""
    },
  })
 
  async function onSubmit(values: LoginSchema) {
    await login(values)
      .then((result) => {
        console.log(result);
        if (result !== undefined && !result.success ) {
          console.log(result);
          toast.error(result.error.toString())
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
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
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
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="underline">
        Sign up.
      </Link>
    </div>
  </>
  )
}
