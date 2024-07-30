'use server'

import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { lucia, validateRequest } from ".";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verify } from "@node-rs/argon2";
import { loginSchema,signUpSchema,type LoginSchema,type SignUpSchema } from "./schemas";

export const signup = async (values:SignUpSchema) => {

  const {data,error} = signUpSchema.safeParse(values)
    if(error) {
    return { success: false, error }
  }

  const existingUser = await db.query.user.findFirst({
    where:eq(user.username,data.username)
  })

  if (existingUser) {
    return ({ success: false, error:"username is already used" })
  }

  const userId = generateIdFromEntropySize(10); // 16 characters long
  const passwordHash = await hash(data.password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

  const [createUser] = await db.insert(user).values({
    id:userId,
    name:data.name,
    username:data.username,
    passwordHash,
  })

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}



export const login = async (values:LoginSchema) => {

  const {data,error} = loginSchema.safeParse(values)

  if(error) {
    return { success: false, error }
  }

  const existingUser = await db.query.user.findFirst({
    where:eq(user.username,data.username)
  })
  
  if (!existingUser) {
    return { success: false, error:"Incorrect username or password" }
  }
  const validPassword = await verify(existingUser.passwordHash ? existingUser.passwordHash : "" , data.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	if (!validPassword) {
		return { success: false, error:"Incorrect username or password" }
	}

  const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}


export const logout = async () => {
  const { session } = await validateRequest();
	if (!session) {
		return { success: false, error:"Unauthorized" }
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}