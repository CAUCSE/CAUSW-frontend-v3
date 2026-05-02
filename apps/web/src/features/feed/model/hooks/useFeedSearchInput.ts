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

import { useSearchParams } from 'next/navigation';

import {
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
  FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY,
  useUpdateFeedKeywordSearchParam,
} from '@/entities/feed';

import { useLocalStorage } from '@/shared/hooks';

export const useFeedSearchInput = () => {
  const [recentSearchKeywords, setRecentSearchKeywords] = useLocalStorage<
    string[]
  >(
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const searchParams = useSearchParams();

  const { updateFeedKeywordSearchParam, removeFeedKeywordSearchParam } =
    useUpdateFeedKeywordSearchParam();

  const searchParamKeyword =
    searchParams.get(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY) ?? '';

  const [currentKeyword, setCurrentKeyword] =
    useState<string>(searchParamKeyword);

  const isComposingRef = useRef(false);

  useEffect(() => {
    setCurrentKeyword(searchParamKeyword);
  }, [searchParamKeyword]);

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
      const updatedRecentSearchKeywords = [
        trimmedCurrentKeyword,
        ...recentSearchKeywords.filter((k) => k !== trimmedCurrentKeyword),
      ];

      setRecentSearchKeywords(updatedRecentSearchKeywords);
      updateFeedKeywordSearchParam(trimmedCurrentKeyword);
    }
  };

  const handleClearKeyword = () => {
    setCurrentKeyword('');
    removeFeedKeywordSearchParam();
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
