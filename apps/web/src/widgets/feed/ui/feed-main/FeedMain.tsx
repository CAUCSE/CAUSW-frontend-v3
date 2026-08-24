'use client';

import {
  FEED_LIST_TAB_SEARCH_PARAM_KEY,
  FeedListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/feed';

import { useFeedMain } from '../../model';
import { FeedStickyHeader } from '../feed-sticky-header';

export const FeedMain = () => {
  const { data: boards, filteredBoardIds } = useFeedMain();
  useNormalizeBoardTabParam({
    boards,
    searchParamKey: FEED_LIST_TAB_SEARCH_PARAM_KEY.CHANNEL,
  });

  return (
    <>
      <FeedStickyHeader />
      <FeedListWrapper
        boardIds={filteredBoardIds}
        boardGroup={BOARD_GROUP.NOTICE}
      />
    </>
  );
};
