'use client';

import { useContext } from 'react';

import { SearchPendingKeywordContext } from '../contexts';

export const useSearchPendingKeywordContext = () => {
  const context = useContext(SearchPendingKeywordContext);

  if (!context) {
    throw new Error(
      'useSearchPendingKeywordContext must be used within a SearchPendingKeywordContext',
    );
  }

  return context;
};
