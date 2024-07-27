import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  confirm: z.string().min(6).max(50),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
});
export type SignUpSchema = z.infer<typeof signUpSchema>