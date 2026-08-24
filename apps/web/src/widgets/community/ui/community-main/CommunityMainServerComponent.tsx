import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { BOARD_GROUP, boardQueryOptions } from '@/entities/feed';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { CommunityMain } from './CommunityMain';

export const CommunityMainServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchQuery(
    boardQueryOptions.available({ boardGroup: BOARD_GROUP.COMMUNITY }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommunityMain />
    </HydrationBoundary>
  );
};
