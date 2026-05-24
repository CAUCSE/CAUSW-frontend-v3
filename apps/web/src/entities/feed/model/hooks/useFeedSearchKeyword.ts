'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY } from '../../config';

export const useFeedSearchKeyword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const feedSearchKeyword = useMemo(() => {
    return searchParams.get(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY) ?? '';
  }, [searchParams]);

  const setFeedSearchKeyword = useCallback(
    (keyword: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY, keyword);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const removeFeedSearchKeyword = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  return {
    feedSearchKeyword,
    setFeedSearchKeyword,
    removeFeedSearchKeyword,
  };
};
