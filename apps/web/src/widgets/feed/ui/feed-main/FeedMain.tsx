'use client';

import {
  POST_LIST_TAB_SEARCH_PARAM_KEY,
  PostListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/feed';

import { useFeedMain } from '../../model';
import { FeedStickyHeader } from '../feed-sticky-header';

export const FeedMain = () => {
  const { data: boards, filteredBoardIds } = useFeedMain();
  useNormalizeBoardTabParam({
    boards,
    searchParamKey: POST_LIST_TAB_SEARCH_PARAM_KEY.CHANNEL,
  });

  return (
    <>
      <FeedStickyHeader />
      <PostListWrapper
        boardIds={filteredBoardIds}
        boardGroup={BOARD_GROUP.NOTICE}
      />
    </>
  );
};
