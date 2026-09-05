'use client';

import { useEffect, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { type Board } from '@/entities/board';

import {
  POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  POST_LIST_TAB,
  POST_LIST_TAB_SEARCH_PARAM_KEY,
  type PostListTabSearchParamKey,
} from '../../config';

interface UseNormalizeBoardTabParamProps {
  boards: Board[];
  searchParamKey?: PostListTabSearchParamKey;
}

interface UseBoardTabSelectionProps extends UseNormalizeBoardTabParamProps {
  includeAllBoardIds?: boolean;
}

const getValidSelectedTab = (boards: Board[], tab: string | null) => {
  if (
    (tab && boards.some((board) => board.id === tab)) ||
    tab === POST_LIST_TAB.ALL
  ) {
    return tab;
  }
  return POST_LIST_TAB.ALL;
};

/**
 * URL의 게시판 탭 값이 실제 게시판에 존재하는지 확인하고,
 * 유효하지 않으면 'all' 탭으로 변경한다.
 */
export const useNormalizeBoardTabParam = ({
  boards,
  searchParamKey = POST_LIST_TAB_SEARCH_PARAM_KEY.TAB,
}: UseNormalizeBoardTabParamProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get(searchParamKey);
    const validTab = getValidSelectedTab(boards, tab);

    if (tab === validTab) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set(searchParamKey, validTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [boards, searchParamKey, router, pathname, searchParams]);
};

export const useBoardTabSelection = ({
  boards,
  includeAllBoardIds = false,
  searchParamKey = POST_LIST_TAB_SEARCH_PARAM_KEY.TAB,
}: UseBoardTabSelectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTab = getValidSelectedTab(
    boards,
    searchParams.get(searchParamKey),
  );

  const filteredBoardIds = useMemo(() => {
    if (selectedTab === POST_LIST_TAB.ALL) {
      return includeAllBoardIds ? boards.map((board) => board.id) : [];
    }
    return boards
      .filter((board) => board.id === selectedTab)
      .map((board) => board.id);
  }, [selectedTab, boards, includeAllBoardIds]);

  const initializeScroll = () => {
    // 모바일은 PullToRefresh의 스크롤 컨테이너가, 데스크톱은 문서(window)가 스크롤 대상
    const scrollContainer = document.querySelector(
      `.${POST_LIST_SCROLL_CONTAINER_CLASS_NAME}`,
    );

    (scrollContainer ?? window).scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(searchParamKey) === value) {
      return;
    }

    params.set(searchParamKey, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    initializeScroll();
  };

  return {
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
