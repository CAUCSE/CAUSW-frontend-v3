'use client';

import { useMemo } from 'react';

import { type Board } from '@/entities/board';

import { POST_LIST_TAB, type PostListTabSearchParamKey } from '../../config';

import { useNormalizeTabParam, useTabSelection } from './useTabSelection';

interface UseNormalizeBoardTabParamProps {
  boards: Board[];
  searchParamKey?: PostListTabSearchParamKey;
}

interface UseBoardTabSelectionProps extends UseNormalizeBoardTabParamProps {
  includeAllBoardIds?: boolean;
}

/**
 * URL의 게시판 탭 값이 실제 게시판에 존재하는지 확인하고,
 * 유효하지 않으면 'all' 탭으로 변경한다.
 */
export const useNormalizeBoardTabParam = ({
  boards,
  searchParamKey,
}: UseNormalizeBoardTabParamProps) => {
  const validValues = useMemo(() => boards.map((board) => board.id), [boards]);

  useNormalizeTabParam({ validValues, searchParamKey });
};

export const useBoardTabSelection = ({
  boards,
  includeAllBoardIds = false,
  searchParamKey,
}: UseBoardTabSelectionProps) => {
  const validValues = useMemo(() => boards.map((board) => board.id), [boards]);
  const { selectedTab, handleTabChange } = useTabSelection({
    validValues,
    searchParamKey,
  });

  const filteredBoardIds = useMemo(() => {
    if (selectedTab === POST_LIST_TAB.ALL) {
      return includeAllBoardIds ? boards.map((board) => board.id) : [];
    }
    return boards
      .filter((board) => board.id === selectedTab)
      .map((board) => board.id);
  }, [selectedTab, boards, includeAllBoardIds]);

  return {
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
