'use client';

import { HStack, VStack } from '@causw/cds';

import {
  FeedRecentSearchKeywordSection,
  FeedSearchHeader,
} from '@/widgets/feed';

import { useSyncFeedKeywordFromSearchParam } from '@/entities/feed';

export const FeedSearchPage = () => {
  useSyncFeedKeywordFromSearchParam();

  return (
    <HStack className="size-full min-h-0 justify-center overflow-hidden">
      <VStack className="min-h-0 w-full py-4 md:px-8 md:py-6 xl:w-225">
        <VStack className="min-h-0 flex-1 gap-3">
          <FeedSearchHeader />
          <FeedRecentSearchKeywordSection />
        </VStack>
      </VStack>
    </HStack>
  );
};
