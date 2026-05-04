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

import {
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
  FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
} from '@/entities/feed';
import { useFeedSearchKeyword } from '@/entities/feed/model/hooks';

import { useLocalStorage } from '@/shared/hooks';

export const useFeedSearchInput = () => {
  const [, setRecentSearchKeywords] = useLocalStorage<string[]>(
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_KEY,
    FEED_RECENT_SEARCH_KEYWORD_STORAGE_INITIAL_VALUE,
    { initializeWithValue: false },
  );

  const { feedSearchKeyword, setFeedSearchKeyword, removeFeedSearchKeyword } =
    useFeedSearchKeyword();

  const [currentKeyword, setCurrentKeyword] =
    useState<string>(feedSearchKeyword);

  const isComposingRef = useRef(false);

  useEffect(() => {
    setCurrentKeyword(feedSearchKeyword);
  }, [feedSearchKeyword]);

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
      setFeedSearchKeyword(trimmedCurrentKeyword);

      setRecentSearchKeywords((prev) => [
        trimmedCurrentKeyword,
        ...prev.filter((k) => k !== trimmedCurrentKeyword),
      ]);
    }
  };

  const handleClearKeyword = () => {
    setCurrentKeyword('');
    removeFeedSearchKeyword();
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
