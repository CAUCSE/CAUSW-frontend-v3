'use client';

import { useFeedMain } from '../../model';
import { FeedListWrapper } from '../feed-list';

export const FeedMain = () => {
  const { filteredBoardIds } = useFeedMain();

  return <FeedListWrapper boardIds={filteredBoardIds} />;
};
