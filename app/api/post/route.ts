import { validateRequest } from "@/auth"
import db from "@/db"
import { NextResponse } from "next/server"

export async function GET() {

  const { session } = await validateRequest()
  
  if(!session) {
    return NextResponse.json({error:"Unauthorized",data:null},{status:401})
  }
  
  const [posts,allLikes] = await Promise.all([
    await db.query.post.findMany({
      with:{
        user:{
          columns:{
            image:false,
            githubId:false,
            googleId:false,
            passwordHash:false,
          }
        },
      },
      columns:{
        userId:false,
        updatedAt:false,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    }),
    db.query.likes.findMany(),
  ])
  const finalResult = posts.map((p) => {
    let postLikes = allLikes.filter((l)=> l.postId === p.id)
    let count = postLikes.length
    let currentUserHasLiked = postLikes.some((l)=> l.userId === session.userId )
    return {
      ...p,
      LikesCount: count,
      hasLiked: currentUserHasLiked,
    }
  })

  return NextResponse.json({ data:finalResult,error:null })  
}