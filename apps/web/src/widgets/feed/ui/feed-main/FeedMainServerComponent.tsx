import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { boardQueryOptions } from '@/entities/feed';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { FeedMain } from './FeedMain';

export const FeedMainServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchQuery(boardQueryOptions.available({ isTab: true }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedMain />
    </HydrationBoundary>
  );
};
