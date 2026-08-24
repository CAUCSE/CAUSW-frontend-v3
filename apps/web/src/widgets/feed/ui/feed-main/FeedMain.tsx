'use client';

import {
  FeedListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/feed';

import { useFeedMain } from '../../model';
import { FeedStickyHeader } from '../feed-sticky-header';

export const FeedMain = () => {
  const { data: boards, filteredBoardIds } = useFeedMain();
  useNormalizeBoardTabParam(boards);

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
