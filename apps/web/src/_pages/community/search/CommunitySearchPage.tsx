import { Suspense } from 'react';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { HStack, VStack } from '@causw/cds';

import {
  SearchHeader,
  RecentSearchKeywordSection,
  SearchResultList,
} from '@/widgets/search';

import { BOARD_GROUP, boardQueryOptions } from '@/entities/feed';
import { SearchPendingKeywordProvider } from '@/entities/search';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryErrorBoundary, SuspenseView } from '@/shared/ui';

export const CommunitySearchPage = async () => {
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
      <HStack className="size-full min-h-0 justify-center overflow-hidden md:overflow-visible">
        <VStack className="min-h-0 w-full min-w-0 xl:w-225">
          <VStack gap="none" className="min-h-0 min-w-0 flex-1">
            <SearchPendingKeywordProvider>
              <SearchHeader boardGroup={BOARD_GROUP.COMMUNITY} />
              <RecentSearchKeywordSection boardGroup={BOARD_GROUP.COMMUNITY} />
            </SearchPendingKeywordProvider>
            <QueryErrorBoundary fallbackMessage="검색 결과를 불러오지 못했어요.">
              <Suspense fallback={<SuspenseView />}>
                <SearchResultList boardGroup={BOARD_GROUP.COMMUNITY} />
              </Suspense>
            </QueryErrorBoundary>
          </VStack>
        </VStack>
      </HStack>
    </HydrationBoundary>
  );
};
