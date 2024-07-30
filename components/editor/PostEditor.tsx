'use client'

import './style.css'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from "@/app/providers/SessionProvider";
import { useCreatePostMutation } from "@/features/post/mutations";
import { useEditor,EditorContent } from "@tiptap/react";
import { PostEditorSkeleton } from "./PostEditorSkeleton";

export const PostEditor = () => {
  const mutation = useCreatePostMutation()
  const {user} = useSession()
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        blockquote:false,
        heading:false
      }),
      Placeholder.configure({
        placeholder: "What is happening?!",
      }),
    ],
  });

  const content = editor?.getText({blockSeparator: "\n" }) || "";
  
  async function onSubmit() {
    editor?.setEditable(false)
    mutation.mutate({text:content},{
      onSuccess:()=>{
        editor?.commands.clearContent();
        editor?.setEditable(true)
      },
    })
  }

  return (
      <div className='flex gap-2 border-b p-4'>
        <div className="flex flex-col">
          <Link href={`/u/${user?.username}`} className="">
            <Avatar className='size-12' >
              <AvatarImage  src={user?.avatarUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{user?.name.slice(0,2)}</AvatarFallback>
            </Avatar>
          </Link>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-grow flex-col gap-2 ">
        {!editor && <PostEditorSkeleton />}
        <EditorContent editor={editor} className="w-full max-h-60 overflow-y-auto shadow-sm" />
        <Button disabled={mutation.isPending} className="place-self-end" variant="outline" onClick={onSubmit}>Post</Button>
    </div>
    </div>
  )
}
