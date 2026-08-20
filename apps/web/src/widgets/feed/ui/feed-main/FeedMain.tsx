'use client';

import { FeedListWrapper } from '@/widgets/post-list';

import { useFeedMain } from '../../model';

export const FeedMain = () => {
  const { filteredBoardIds } = useFeedMain();

  return <FeedListWrapper boardIds={filteredBoardIds} />;
};
