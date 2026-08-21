'use client';

import { useBoardTabSelection } from '@/widgets/post-list';

import { useGetAvailableBoards } from '@/entities/feed';

export const useFeedMain = () => {
  const { data } = useGetAvailableBoards({ isTab: true });

  const { selectedTab, filteredBoardIds, handleTabChange } =
    useBoardTabSelection(data.boards);

  return {
    data: data.boards,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
