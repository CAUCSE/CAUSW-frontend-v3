'use client';

import {
  PostListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/feed';

import { useCommunityMain } from '../../model';
import { CommunityStickyHeader } from '../community-sticky-header';

export const CommunityMain = () => {
  const { data: boards, filteredBoardIds } = useCommunityMain();
  useNormalizeBoardTabParam({ boards });

  return (
    <>
      <CommunityStickyHeader />
      <PostListWrapper
        boardIds={filteredBoardIds}
        boardGroup={BOARD_GROUP.COMMUNITY}
      />
    </>
  );
};
