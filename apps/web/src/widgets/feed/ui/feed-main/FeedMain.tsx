'use client';

import { VStack } from '@causw/cds';

import { useFeedViewMode } from '@/entities/feed';

import { useFeedMain } from '../../model';
import { FeedListWrapper } from '../feed-list';
import { FeedListToolbar } from '../feed-list-toolbar';

export const FeedMain = () => {
  const {
    data: boards,
    feedListRef,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  } = useFeedMain();

  const { feedViewMode, setFeedViewMode } = useFeedViewMode();

  return (
    <VStack gap="none" className="min-h-0 flex-1">
      <FeedListToolbar
        feedViewMode={feedViewMode}
        onFeedViewModeChange={setFeedViewMode}
        boards={boards}
        selectedTab={selectedTab}
        onSelectedTabChange={handleTabChange}
      />
      <FeedListWrapper boardIds={filteredBoardIds} ref={feedListRef} />
    </VStack>
  );
};
