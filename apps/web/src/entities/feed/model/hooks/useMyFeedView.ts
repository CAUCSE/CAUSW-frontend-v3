'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  isMyFeedView,
  MY_FEED_VIEW,
  MY_FEED_VIEW_SEARCH_PARAM_KEY,
  type MyFeedView,
} from '../../config';

export const useMyFeedView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const myFeedView = useMemo(() => {
    const view = searchParams.get(MY_FEED_VIEW_SEARCH_PARAM_KEY);
    if (!view || !isMyFeedView(view)) {
      return MY_FEED_VIEW.MY_POSTS;
    }

    return view;
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
