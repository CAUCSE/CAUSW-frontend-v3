'use client';

import { type BoardGroup } from '@/entities/board';
import {
  RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  getRecentSearchKeywordStorageKey,
} from '@/entities/search';

import { useLocalStorage } from '@/shared/hooks';

interface UseRecentSearchKeywordSectionProps {
  boardGroup: BoardGroup;
}

export const useRecentSearchKeywordSection = ({
  boardGroup,
}: UseRecentSearchKeywordSectionProps) => {
  const [recentSearchKeywords, setRecentSearchKeywords] = useLocalStorage<
    string[]
  >(
    getRecentSearchKeywordStorageKey(boardGroup),
    RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
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
