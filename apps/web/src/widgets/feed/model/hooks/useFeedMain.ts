'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useGetAvailableBoards } from '@/entities/feed';

import { FEED_LIST_TAB, FEED_LIST_TAB_SEARCH_PARAM_KEY } from '../../config';

export const useFeedMain = () => {
  const { data } = useGetAvailableBoards();

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

  const [selectedTab, setSelectedTab] = useState<string>(() =>
    getValidSelectedTab(searchParams.get(FEED_LIST_TAB_SEARCH_PARAM_KEY.TAB)),
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
    if (selectedTab === 'all') {
      return data.boards.map((board) => board.id);
    }
    return data.boards
      .filter((board) => board.id === selectedTab)
      .map((board) => board.id);
  }, [selectedTab, data.boards]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);

    feedListRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const params = new URLSearchParams(searchParams.toString());

    if (params.get('tab') === value) {
      return;
    }

    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    data: data.boards,
    feedListRef,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
