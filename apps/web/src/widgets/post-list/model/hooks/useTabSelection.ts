'use client';

import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  POST_LIST_TAB,
  POST_LIST_TAB_SEARCH_PARAM_KEY,
  type PostListTabSearchParamKey,
} from '../../config';

interface UseTabSelectionProps {
  validValues: string[];
  searchParamKey?: PostListTabSearchParamKey;
}

const getValidSelectedTab = (validValues: string[], tab: string | null) => {
  if ((tab && validValues.includes(tab)) || tab === POST_LIST_TAB.ALL) {
    return tab;
  }
  return POST_LIST_TAB.ALL;
};

/**
 * URL의 탭 값이 유효한 값 목록에 있는지 확인하고, 유효하지 않으면 'all' 탭으로 변경한다.
 */
export const useNormalizeTabParam = ({
  validValues,
  searchParamKey = POST_LIST_TAB_SEARCH_PARAM_KEY.TAB,
}: UseTabSelectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get(searchParamKey);
    const validTab = getValidSelectedTab(validValues, tab);

    if (tab === validTab) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set(searchParamKey, validTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [validValues, searchParamKey, router, pathname, searchParams]);
};

/**
 * URL 검색 파라미터와 동기화되는 탭 선택 상태를 관리한다.
 */
export const useTabSelection = ({
  validValues,
  searchParamKey = POST_LIST_TAB_SEARCH_PARAM_KEY.TAB,
}: UseTabSelectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTab = getValidSelectedTab(
    validValues,
    searchParams.get(searchParamKey),
  );

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(searchParamKey) === value) {
      return;
    }

    params.set(searchParamKey, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    // 모바일은 PullToRefresh의 스크롤 컨테이너가, 데스크톱은 문서(window)가 스크롤 대상
    const scrollContainer = document.querySelector(
      `.${POST_LIST_SCROLL_CONTAINER_CLASS_NAME}`,
    );
    (scrollContainer ?? window).scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    selectedTab,
    handleTabChange,
  };
};
