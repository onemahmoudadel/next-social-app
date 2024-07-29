import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { QueryFunction, QueryKey, QueryOptions } from '@tanstack/react-query';

import type { ReactNode } from 'react'
interface Props {
  children: ReactNode,
  queryKey: QueryKey,
  queryFn: QueryFunction,
  queryOptions?: QueryOptions,
}

const PrefetchProvider = async ({children,queryKey,queryFn,queryOptions}:Props) => {
  console.log(queryOptions);
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({queryKey,queryFn,...queryOptions})
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export default PrefetchProvider