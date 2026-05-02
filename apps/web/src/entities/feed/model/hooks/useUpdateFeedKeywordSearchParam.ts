'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY } from '../../config';

export const useUpdateFeedKeywordSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFeedKeywordSearchParam = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY, keyword);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const removeFeedKeywordSearchParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(FEED_SEARCH_KEYWORD_SEARCH_PARAM_KEY);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    updateFeedKeywordSearchParam,
    removeFeedKeywordSearchParam,
  };
};
