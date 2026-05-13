'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useGetAvailableBoards } from '@/entities/feed';

import { useBreakpoint } from '@/shared/hooks';

import { FEED_LIST_TAB, FEED_LIST_TAB_SEARCH_PARAM_KEY } from '../../config';

export const useFeedMain = () => {
  const { data } = useGetAvailableBoards();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isMobileSize } = useBreakpoint();

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

  const feedListRef = useRef<HTMLUListElement | null>(null);

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
    const feedList = feedListRef.current;
    if (!feedList) {
      return;
    }

    // 모바일일 때는 PullToRefresh 컴포넌트의 스크롤 컨테이너를 스크롤 시킴
    if (isMobileSize) {
      const scrollContainer = feedList.closest('.feed-list-scroll-container');

      scrollContainer?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      feedList.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
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
    feedListRef,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
