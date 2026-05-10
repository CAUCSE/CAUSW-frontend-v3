'use client';

import { type MouseEvent } from 'react';

import {
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
  useFeedSearchKeyword,
  useFeedSearchPendingKeywordContext,
} from '@/entities/feed';

import { useLocalStorage } from '@/shared/hooks';

interface UseFeedRecentSearchKeywordChipProps {
  keyword: string;
}

export const useFeedRecentSearchKeywordChip = ({
  keyword,
}: UseFeedRecentSearchKeywordChipProps) => {
  const { setFeedSearchKeyword } = useFeedSearchKeyword();

  const [, setRecentSearchKeywords] = useLocalStorage<string[]>(
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const { setPendingSearchKeyword } = useFeedSearchPendingKeywordContext();

  const handleClickRecentSearchKeyword = () => {
    setFeedSearchKeyword(keyword);
    setPendingSearchKeyword(keyword);

    setRecentSearchKeywords((prev) => [
      keyword,
      ...prev.filter((k) => k !== keyword).slice(0, 9),
    ]);
  };

  const handleRemoveRecentSearchKeyword = (
    event: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.stopPropagation();
    setRecentSearchKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    handleClickRecentSearchKeyword,
    handleRemoveRecentSearchKeyword,
  };
};
