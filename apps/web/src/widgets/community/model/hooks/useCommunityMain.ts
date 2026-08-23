'use client';

import { useMemo } from 'react';

import { useBoardTabSelection } from '@/widgets/post-list';

import { useGetAvailableBoards } from '@/entities/feed';

import { COMMUNITY_BOARD_NAMES } from '../../config';

export const useCommunityMain = () => {
  const { data } = useGetAvailableBoards({ isTab: true });

  const communityBoards = useMemo(
    () =>
      data.boards.filter((board) => COMMUNITY_BOARD_NAMES.includes(board.name)),
    [data.boards],
  );

  const { selectedTab, filteredBoardIds, handleTabChange } =
    useBoardTabSelection(communityBoards, { includeAllBoardIds: true });

  return {
    data: communityBoards,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
