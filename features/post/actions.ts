'use server'

import { validateRequest } from "@/auth";
import db from "@/db";
import { post, user } from "@/db/schema";
import { sleep } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function createPost({text}:{text:string}) {

  await sleep(2000)

  const { session } = await validateRequest()

  if(!session) {
    throw new Error("Unauthorized")
  }
  
  const [newPost] = await db.insert(post).values({
    text,
    userId:session.userId,
  }).returning()

  const createdBy = await db.query.user.findFirst({
    where: eq(user.id,newPost.userId)
  })
  return {
    id:newPost.id,
    createdAt:newPost.createdAt,
    image:newPost.image,
    updatedAt:newPost.updatedAt,
    text:newPost.text,
    user:{
      id:createdBy?.id,
      avatarUrl:createdBy?.avatarUrl,
      bio:createdBy?.bio,
      coverImage:createdBy?.coverImage,
      createdAt:createdBy?.createdAt,
      name:createdBy?.name,
      username:createdBy?.username,
    },
  }
}