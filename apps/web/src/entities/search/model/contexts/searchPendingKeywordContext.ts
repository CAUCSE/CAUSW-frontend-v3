'use client';

import { createContext } from 'react';

interface SearchPendingKeywordState {
  pendingSearchKeyword: string;
}

interface SearchPendingKeywordActions {
  setPendingSearchKeyword: (keyword: string) => void;
  clearPendingSearchKeyword: () => void;
}

type SearchPendingKeywordContextType = SearchPendingKeywordState &
  SearchPendingKeywordActions;

export const SearchPendingKeywordContext = createContext<
  SearchPendingKeywordContextType | undefined
>(undefined);
