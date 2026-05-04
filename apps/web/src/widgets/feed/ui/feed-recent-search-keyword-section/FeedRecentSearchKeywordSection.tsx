'use client';

import { Button, HStack, Text, VStack } from '@causw/cds';

import { FeedRecentSearchKeywordChip } from '@/features/feed';

import { useFeedSearchKeyword } from '@/entities/feed/model/hooks';

import { useFeedRecentSearchKeywordSection } from '../../model';

import { FeedRecentSearchKeywordSectionEmptyView } from './FeedRecentSearchKeywordSectionEmptyView';

export const FeedRecentSearchKeywordSection = () => {
  const { recentSearchKeywords, handleRemoveAllRecentSearchKeywords } =
    useFeedRecentSearchKeywordSection();

  const { feedSearchKeyword } = useFeedSearchKeyword();

  if (feedSearchKeyword) {
    return null;
  }

  if (recentSearchKeywords.length === 0) {
    return <FeedRecentSearchKeywordSectionEmptyView />;
  }

  return (
    <VStack gap="md" className="px-4 py-6 md:px-0" as="section">
      <HStack gap="none" align="center" justify="between" className="px-1">
        <Text typography="subtitle-16-bold" textColor="gray-700">
          최근 검색어
        </Text>
        <Button
          color="gray"
          className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
          onClick={handleRemoveAllRecentSearchKeywords}
        >
          전체 삭제
        </Button>
      </HStack>
      <HStack gap="sm" align="center" className="overflow-x-auto">
        {recentSearchKeywords.map((keyword, idx) => (
          <FeedRecentSearchKeywordChip
            key={keyword}
            keyword={keyword}
            index={idx}
          />
        ))}
      </HStack>
    </VStack>
  );
};
