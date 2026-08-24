'use client';

import {
  FeedListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { useFeedMain } from '../../model';

export const FeedMain = () => {
  const { data: boards, filteredBoardIds } = useFeedMain();
  useNormalizeBoardTabParam(boards);

  return <FeedListWrapper boardIds={filteredBoardIds} />;
};
