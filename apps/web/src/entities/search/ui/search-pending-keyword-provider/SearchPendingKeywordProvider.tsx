'use client';

import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { SearchPendingKeywordContext } from '../../model';

export const SearchPendingKeywordProvider = ({
  children,
}: PropsWithChildren) => {
  const [pendingSearchKeyword, setPendingSearchKeyword] = useState<string>('');

  const clearPendingSearchKeyword = useCallback(() => {
    setPendingSearchKeyword('');
  }, []);

  const value = useMemo(
    () => ({
      pendingSearchKeyword,
      setPendingSearchKeyword,
      clearPendingSearchKeyword,
    }),
    [pendingSearchKeyword, setPendingSearchKeyword, clearPendingSearchKeyword],
  );

  return (
    <SearchPendingKeywordContext.Provider value={value}>
      {children}
    </SearchPendingKeywordContext.Provider>
  );
};
