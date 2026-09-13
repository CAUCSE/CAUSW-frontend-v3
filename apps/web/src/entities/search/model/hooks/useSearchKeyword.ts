'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SEARCH_KEYWORD_SEARCH_PARAM_KEY } from '../../config';

export const useSearchKeyword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchKeyword = useMemo(() => {
    return searchParams.get(SEARCH_KEYWORD_SEARCH_PARAM_KEY) ?? '';
  }, [searchParams]);

  const setSearchKeyword = useCallback(
    (keyword: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(SEARCH_KEYWORD_SEARCH_PARAM_KEY, keyword);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const removeSearchKeyword = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(SEARCH_KEYWORD_SEARCH_PARAM_KEY);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  return {
    searchKeyword,
    setSearchKeyword,
    removeSearchKeyword,
  };
};
