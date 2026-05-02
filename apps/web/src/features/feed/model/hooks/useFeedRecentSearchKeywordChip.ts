'use client';

import { type MouseEvent } from 'react';

import {
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
  useUpdateFeedKeywordSearchParam,
} from '@/entities/feed';

import { useLocalStorage } from '@/shared/hooks';

interface UseFeedRecentSearchKeywordChipProps {
  keyword: string;
}

export const useFeedRecentSearchKeywordChip = ({
  keyword,
}: UseFeedRecentSearchKeywordChipProps) => {
  const { updateFeedKeywordSearchParam } = useUpdateFeedKeywordSearchParam();

  const [recentSearchKeywords, setRecentSearchKeywords] = useLocalStorage<
    string[]
  >(
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const handleClickRecentSearchKeyword = () => {
    updateFeedKeywordSearchParam(keyword);

    const updatedRecentSearchKeywords = [
      keyword,
      ...recentSearchKeywords.filter((k) => k !== keyword),
    ];

    setRecentSearchKeywords(updatedRecentSearchKeywords);
  };

  const handleRemoveRecentSearchKeyword = (
    event: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.stopPropagation();
    setRecentSearchKeywords(recentSearchKeywords.filter((_, i) => i !== index));
  };

  return {
    handleClickRecentSearchKeyword,
    handleRemoveRecentSearchKeyword,
  };
};
