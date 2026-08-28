'use client';

import {
  FEED_LIST_TAB_SEARCH_PARAM_KEY,
  useBoardTabSelection,
} from '@/widgets/post-list';

import { BOARD_GROUP, useGetAvailableBoards } from '@/entities/feed';

export const useFeedMain = () => {
  const { data } = useGetAvailableBoards({ boardGroup: BOARD_GROUP.NOTICE });

  const { selectedTab, filteredBoardIds, handleTabChange } =
    useBoardTabSelection({
      boards: data.boards,
      searchParamKey: FEED_LIST_TAB_SEARCH_PARAM_KEY.CHANNEL,
    });

  return {
    data: data.boards,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  };
};
