import { ScrollArea } from "@/components/ui/scroll-area"
import { Feed } from './Feed'
import { getPrefetchQueryOptions } from '@/features/post/prefetch'
import PrefetchProvider from '@/app/providers/PrefetchProvider'

export default function Page() { 
  const {prefetchQueryFn,queryKey} = getPrefetchQueryOptions()

  return (
    <div className='flex '>
      {/* <PrefetchProvider queryFn={prefetchQueryFn} queryKey={queryKey}  > */}
        <Feed />
      {/* </PrefetchProvider> */}

      <div className="hidden lg:block h-screen sticky top-0  max-w-96 p-4 bg-green-200">
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