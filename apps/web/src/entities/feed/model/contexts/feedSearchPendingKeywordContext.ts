'use client';

import { createContext } from 'react';

interface FeedSearchPendingKeywordState {
  pendingSearchKeyword: string;
}

interface FeedSearchPendingKeywordActions {
  setPendingSearchKeyword: (keyword: string) => void;
  clearPendingSearchKeyword: () => void;
}

type FeedSearchPendingKeywordContextType = FeedSearchPendingKeywordState &
  FeedSearchPendingKeywordActions;

export const FeedSearchPendingKeywordContext = createContext<
  FeedSearchPendingKeywordContextType | undefined
>(undefined);
