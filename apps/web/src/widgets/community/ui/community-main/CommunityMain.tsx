'use client';

import {
  FeedListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { useCommunityMain } from '../../model';

export const CommunityMain = () => {
  const { data: boards, filteredBoardIds } = useCommunityMain();
  useNormalizeBoardTabParam(boards);

  return <FeedListWrapper boardIds={filteredBoardIds} />;
};
