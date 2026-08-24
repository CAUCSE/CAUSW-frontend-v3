'use client';

import {
  FeedListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { useCommunityMain } from '../../model';
import { CommunityStickyHeader } from '../community-sticky-header';

export const CommunityMain = () => {
  const { data: boards, filteredBoardIds } = useCommunityMain();
  useNormalizeBoardTabParam(boards);

  return (
    <>
      <CommunityStickyHeader />
      <FeedListWrapper boardIds={filteredBoardIds} />
    </>
  );
};
