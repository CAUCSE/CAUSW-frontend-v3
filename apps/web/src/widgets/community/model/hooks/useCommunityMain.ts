'use client';

import { useBoardTabSelection } from '@/widgets/post-list';

import { BOARD_GROUP, useGetAvailableBoards } from '@/entities/feed';

export const useCommunityMain = () => {
  const { data } = useGetAvailableBoards({
    boardGroup: BOARD_GROUP.COMMUNITY,
  });

  const { selectedTab, filteredBoardIds, handleTabChange } =
    useBoardTabSelection({ boards: data.boards, includeAllBoardIds: true });

  return {
    data: data.boards,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
