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

import { QUERY_STALE_TIME, ROUTES } from '@/shared/constants';
import { QueryErrorBoundary, SuspenseView } from '@/shared/ui';

export const FeedSearchPage = async () => {
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
      <HStack className="size-full min-h-0 justify-center overflow-hidden">
        <VStack className="min-h-0 w-full min-w-0 py-4 md:px-8 md:py-6 xl:w-225">
          <VStack className="min-h-0 min-w-0 flex-1 gap-3">
            <SearchPendingKeywordProvider>
              <SearchHeader boardGroup={BOARD_GROUP.NOTICE} />
              <RecentSearchKeywordSection boardGroup={BOARD_GROUP.NOTICE} />
            </SearchPendingKeywordProvider>
            <QueryErrorBoundary fallbackMessage="검색 결과를 불러오지 못했어요.">
              <Suspense fallback={<SuspenseView />}>
                <SearchResultList
                  boardGroup={BOARD_GROUP.NOTICE}
                  writeHref={ROUTES.REGISTER_FEED}
                />
              </Suspense>
            </QueryErrorBoundary>
          </VStack>
        </VStack>
      </HStack>
    </HydrationBoundary>
  );
};
