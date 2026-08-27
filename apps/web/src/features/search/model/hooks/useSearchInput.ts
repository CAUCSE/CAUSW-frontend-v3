'use client';

import {
  type ChangeEvent,
  type CompositionEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type BoardGroup } from '@/entities/feed';
import {
  RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  getRecentSearchKeywordStorageKey,
  useSearchKeyword,
  useSearchPendingKeywordContext,
} from '@/entities/search';

import { useLocalStorage } from '@/shared/hooks';

interface UseSearchInputProps {
  boardGroup: BoardGroup;
}

export const useSearchInput = ({ boardGroup }: UseSearchInputProps) => {
  const [, setRecentSearchKeywords] = useLocalStorage<string[]>(
    getRecentSearchKeywordStorageKey(boardGroup),
    RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const { setPendingSearchKeyword, clearPendingSearchKeyword } =
    useSearchPendingKeywordContext();

  const { searchKeyword, setSearchKeyword, removeSearchKeyword } =
    useSearchKeyword();

  const [currentKeyword, setCurrentKeyword] = useState<string>(searchKeyword);

  const isComposingRef = useRef(false);

  useEffect(() => {
    const updateSearchKeyword = () => {
      setCurrentKeyword(searchKeyword);

      if (searchKeyword.trim().length === 0) {
        clearPendingSearchKeyword();
      }
    };
    updateSearchKeyword();
  }, [searchKeyword, clearPendingSearchKeyword]);

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setCurrentKeyword(event.currentTarget.value);
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value.trim().length === 0 &&
      searchKeyword.trim().length > 0
    ) {
      removeSearchKeyword();
      clearPendingSearchKeyword();
    }

    setCurrentKeyword(event.target.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const trimmedCurrentKeyword = currentKeyword.trim();

    if (
      event.nativeEvent.isComposing ||
      isComposingRef.current ||
      trimmedCurrentKeyword.length === 0
    ) {
      return;
    }

    if (event.key === 'Enter') {
      setSearchKeyword(trimmedCurrentKeyword);
      setPendingSearchKeyword(trimmedCurrentKeyword);

      setRecentSearchKeywords((prev) => [
        trimmedCurrentKeyword,
        ...prev.filter((k) => k !== trimmedCurrentKeyword).slice(0, 9),
      ]);
    }
  };

  const handleClearKeyword = () => {
    setCurrentKeyword('');
    removeSearchKeyword();
    clearPendingSearchKeyword();
  };

  return {
    currentKeyword,
    handleInitialFocus,
    handleCompositionStart,
    handleCompositionEnd,
    handleTextInputChange,
    handleEnterPress,
    handleClearKeyword,
  };
};
