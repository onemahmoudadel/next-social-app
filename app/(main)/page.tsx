import React from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function Page() {
  return (
    <div className='flex '>
      <div className="min-h-screen border-x p-4 bg-red-200">
        Home Page
        
        <div className='space-y-8'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste numquam ipsa voluptates laboriosam inventore, ducimus quidem, iusto rem quos magni nesciunt, sapiente tempora debitis cumque voluptatum! Et, accusantium! Beatae, eligendi?</p>
        </div>
      </div>
      <div className="hidden lg:block h-screen sticky top-0 min-w-60 max-w-72 p-4 bg-green-200">
      <ScrollArea className="h-screen px-4 border rounded-sm bg-white">
        Suggested people
        <ul className='space-y-4'>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
          <li className="ps-2">Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </ScrollArea>
      </div>
    </div>
  )
}