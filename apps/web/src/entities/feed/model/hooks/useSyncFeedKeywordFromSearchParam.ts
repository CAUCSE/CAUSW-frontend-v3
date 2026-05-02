'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY } from '../../config';
import { useFeedSearchKeywordStore } from '../stores';

export const useSyncFeedKeywordFromSearchParam = () => {
  const setFeedSearchKeyword = useFeedSearchKeywordStore(
    (state) => state.setFeedSearchKeyword,
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    setFeedSearchKeyword(
      searchParams.get(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY) ?? '',
    );
  }, [searchParams, setFeedSearchKeyword]);
};
