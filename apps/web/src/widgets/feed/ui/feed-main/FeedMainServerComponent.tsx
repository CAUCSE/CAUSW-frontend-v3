import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { BOARD_GROUP, boardQueryOptions } from '@/entities/board';

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

  await queryClient.prefetchQuery(
    boardQueryOptions.available({ boardGroup: BOARD_GROUP.NOTICE }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedMain />
    </HydrationBoundary>
  );
};
