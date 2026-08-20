'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useGetAvailableBoards } from '@/entities/feed';

import {
  FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  FEED_LIST_TAB,
  FEED_LIST_TAB_SEARCH_PARAM_KEY,
} from '../../config';

export const useFeedMain = () => {
  const { data } = useGetAvailableBoards({ isTab: true });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getValidSelectedTab = useCallback(
    (tab: string | null) => {
      if (
        (tab && data.boards.some((board) => board.id === tab)) ||
        tab === FEED_LIST_TAB.ALL
      ) {
        return tab;
      }
      return FEED_LIST_TAB.ALL;
    },
    [data.boards],
  );

  const selectedTab = getValidSelectedTab(
    searchParams.get(FEED_LIST_TAB_SEARCH_PARAM_KEY.TAB),
  );

  useEffect(() => {
    const tab = searchParams.get(FEED_LIST_TAB_SEARCH_PARAM_KEY.TAB);
    const validTab = getValidSelectedTab(tab);

    if (tab === validTab) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set(FEED_LIST_TAB_SEARCH_PARAM_KEY.TAB, validTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [getValidSelectedTab, router, pathname, searchParams]);

  const filteredBoardIds = useMemo(() => {
    if (selectedTab === FEED_LIST_TAB.ALL) {
      return [];
    }
    return data.boards
      .filter((board) => board.id === selectedTab)
      .map((board) => board.id);
  }, [selectedTab, data.boards]);

  const initializeScroll = () => {
    // 모바일은 PullToRefresh의 스크롤 컨테이너가, 데스크톱은 문서(window)가 스크롤 대상
    const scrollContainer = document.querySelector(
      `.${FEED_LIST_SCROLL_CONTAINER_CLASS_NAME}`,
    );

    (scrollContainer ?? window).scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(FEED_LIST_TAB_SEARCH_PARAM_KEY.TAB) === value) {
      return;
    }

    params.set(FEED_LIST_TAB_SEARCH_PARAM_KEY.TAB, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    initializeScroll();
  };

  return {
    data: data.boards,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
