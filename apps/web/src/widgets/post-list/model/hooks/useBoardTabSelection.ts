'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { type Board } from '@/entities/feed';

import {
  FEED_LIST_SCROLL_CONTAINER_CLASS_NAME,
  FEED_LIST_TAB,
  FEED_LIST_TAB_SEARCH_PARAM_KEY,
} from '../../config';

interface UseBoardTabSelectionOptions {
  /**
   * '전체' 탭에서 게시판 id 목록을 명시적으로 전달할지 여부.
   * 피드는 빈 배열을 보내 서버가 읽기 가능한 전체 게시판을 조회하게 하고,
   * 소통 탭처럼 부분집합만 다루는 화면은 true로 두어 해당 게시판들만 조회한다.
   */
  includeAllBoardIds?: boolean;
}

/**
 * URL(?tab=) 기반으로 게시판 탭 선택 상태를 관리하는 훅.
 * 전달받은 boards 목록에 없는 탭 값은 '전체'로 정규화한다.
 */
export const useBoardTabSelection = (
  boards: Board[],
  { includeAllBoardIds = false }: UseBoardTabSelectionOptions = {},
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getValidSelectedTab = useCallback(
    (tab: string | null) => {
      if (
        (tab && boards.some((board) => board.id === tab)) ||
        tab === FEED_LIST_TAB.ALL
      ) {
        return tab;
      }
      return FEED_LIST_TAB.ALL;
    },
    [boards],
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
      return includeAllBoardIds ? boards.map((board) => board.id) : [];
    }
    return boards
      .filter((board) => board.id === selectedTab)
      .map((board) => board.id);
  }, [selectedTab, boards, includeAllBoardIds]);

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
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
