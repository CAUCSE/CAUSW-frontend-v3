import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { HStack, VStack } from '@causw/cds';

import {
  FeedRecentSearchKeywordSection,
  FeedSearchHeader,
  FeedSearchResultList,
} from '@/widgets/feed';

import {
  boardQueryOptions,
  FeedSearchPendingKeywordProvider,
} from '@/entities/feed';

import { QUERY_STALE_TIME } from '@/shared/constants';

export const FeedSearchPage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchQuery(boardQueryOptions.available());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HStack className="size-full min-h-0 justify-center overflow-hidden">
        <VStack className="min-h-0 w-full py-4 md:px-8 md:py-6 xl:w-225">
          <VStack className="min-h-0 flex-1 gap-3">
            <FeedSearchPendingKeywordProvider>
              <FeedSearchHeader />
              <FeedRecentSearchKeywordSection />
            </FeedSearchPendingKeywordProvider>
            <FeedSearchResultList />
          </VStack>
        </VStack>
      </HStack>
    </HydrationBoundary>
  );
};
