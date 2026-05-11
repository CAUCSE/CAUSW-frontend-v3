'use client';

import { useContext } from 'react';

import { FeedSearchPendingKeywordContext } from '../contexts';

export const useFeedSearchPendingKeywordContext = () => {
  const context = useContext(FeedSearchPendingKeywordContext);

  if (!context) {
    throw new Error(
      'useFeedSearchPendingKeywordContext must be used within a FeedSearchPendingKeywordContext',
    );
  }

  return context;
};
