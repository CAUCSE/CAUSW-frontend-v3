'use client';

import {
  PostListWrapper,
  useNormalizeBoardTabParam,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/board';

import { useCommunityMain } from '../../model';

export const CommunityMain = () => {
  const { data: boards, filteredBoardIds } = useCommunityMain();
  useNormalizeBoardTabParam({ boards });

  return (
    <PostListWrapper
      boardIds={filteredBoardIds}
      boardGroup={BOARD_GROUP.COMMUNITY}
    />
  );
};
