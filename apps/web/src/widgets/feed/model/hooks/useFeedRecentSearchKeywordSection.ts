'use client';

import {
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
} from '@/entities/feed';

import { useLocalStorage } from '@/shared/hooks';

export const useFeedRecentSearchKeywordSection = () => {
  const [recentSearchKeywords, setRecentSearchKeywords] = useLocalStorage<
    string[]
  >(
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const handleRemoveAllRecentSearchKeywords = () => {
    setRecentSearchKeywords([]);
  };

  return {
    recentSearchKeywords,
    handleRemoveAllRecentSearchKeywords,
  };
};
