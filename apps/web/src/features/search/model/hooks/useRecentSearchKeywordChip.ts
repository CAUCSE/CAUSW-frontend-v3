'use client';

import { type MouseEvent } from 'react';

import { type BoardGroup } from '@/entities/board';
import {
  RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  getRecentSearchKeywordStorageKey,
  useSearchKeyword,
  useSearchPendingKeywordContext,
} from '@/entities/search';

import { useLocalStorage } from '@/shared/hooks';

interface UseRecentSearchKeywordChipProps {
  boardGroup: BoardGroup;
  keyword: string;
}

export const useRecentSearchKeywordChip = ({
  boardGroup,
  keyword,
}: UseRecentSearchKeywordChipProps) => {
  const { setSearchKeyword } = useSearchKeyword();

  const [, setRecentSearchKeywords] = useLocalStorage<string[]>(
    getRecentSearchKeywordStorageKey(boardGroup),
    RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const { setPendingSearchKeyword } = useSearchPendingKeywordContext();

  const handleClickRecentSearchKeyword = () => {
    setSearchKeyword(keyword);
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
