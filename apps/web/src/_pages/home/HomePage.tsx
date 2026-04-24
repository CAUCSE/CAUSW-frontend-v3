import { Suspense } from 'react';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { HomePageContent } from '@/widgets/home';

import { authQueryOptions } from '@/entities/auth';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { SuspenseView } from '@/shared/ui';

export async function HomePage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.LONG,
      },
    },
  });

  queryClient.prefetchQuery(authQueryOptions.me());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SuspenseView />}>
        <HomePageContent />
      </Suspense>
    </HydrationBoundary>
  );
}
