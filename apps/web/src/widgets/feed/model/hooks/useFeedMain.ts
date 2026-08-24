'use client';

import { useBoardTabSelection } from '@/widgets/post-list';

import { BOARD_GROUP, useGetAvailableBoards } from '@/entities/feed';

export const useFeedMain = () => {
  const { data } = useGetAvailableBoards({ boardGroup: BOARD_GROUP.NOTICE });

  const { selectedTab, filteredBoardIds, handleTabChange } =
    useBoardTabSelection(data.boards);

  return {
    data: data.boards,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
