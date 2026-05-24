'use client';

import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { FeedSearchPendingKeywordContext } from '../../model';

export const FeedSearchPendingKeywordProvider = ({
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
    <FeedSearchPendingKeywordContext.Provider value={value}>
      {children}
    </FeedSearchPendingKeywordContext.Provider>
  );
};
