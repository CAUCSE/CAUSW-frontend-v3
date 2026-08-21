'use client';

import { FeedListWrapper } from '@/widgets/post-list';

import { useCommunityMain } from '../../model';

export const CommunityMain = () => {
  const { filteredBoardIds } = useCommunityMain();

  return <FeedListWrapper boardIds={filteredBoardIds} />;
};
