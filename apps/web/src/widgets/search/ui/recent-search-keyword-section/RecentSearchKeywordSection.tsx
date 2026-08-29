'use client';

import { Button, HStack, Text, VStack } from '@causw/cds';

import { RecentSearchKeywordChip } from '@/features/search';

import { type BoardGroup } from '@/entities/feed';
import {
  useSearchKeyword,
  useSearchPendingKeywordContext,
} from '@/entities/search';

import { useRecentSearchKeywordSection } from '../../model';

import { RecentSearchKeywordSectionEmptyView } from './RecentSearchKeywordSectionEmptyView';

interface RecentSearchKeywordSectionProps {
  boardGroup: BoardGroup;
}

export const RecentSearchKeywordSection = ({
  boardGroup,
}: RecentSearchKeywordSectionProps) => {
  const { recentSearchKeywords, handleRemoveAllRecentSearchKeywords } =
    useRecentSearchKeywordSection({ boardGroup });

  const { searchKeyword } = useSearchKeyword();
  const { pendingSearchKeyword } = useSearchPendingKeywordContext();

  if (searchKeyword || pendingSearchKeyword) {
    return null;
  }

  if (recentSearchKeywords.length === 0) {
    return <RecentSearchKeywordSectionEmptyView />;
  }

  return (
    <VStack gap="md" className="px-4 py-2" as="section">
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
      <HStack gap="sm" align="center" className="flex-wrap">
        {recentSearchKeywords.map((keyword, idx) => (
          <RecentSearchKeywordChip
            key={keyword}
            boardGroup={boardGroup}
            keyword={keyword}
            index={idx}
          />
        ))}
      </HStack>
    </VStack>
  );
};
