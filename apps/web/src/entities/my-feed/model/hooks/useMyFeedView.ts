'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  MY_FEED_VIEW_SEARCH_PARAM_KEY,
  normalizeMyFeedView,
  type MyFeedView,
} from '../../config';

export const useMyFeedView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const myFeedView = useMemo(() => {
    const view = searchParams.get(MY_FEED_VIEW_SEARCH_PARAM_KEY);

    return normalizeMyFeedView(view);
  }, [searchParams]);

  const setMyFeedView = useCallback(
    (view: MyFeedView) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(MY_FEED_VIEW_SEARCH_PARAM_KEY, view);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return {
    myFeedView,
    setMyFeedView,
  };
};
