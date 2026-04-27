'use client';

import { Tab, VStack } from '@causw/cds';

import { FEED_LIST_TAB } from '../../config';
import { useFeedMain } from '../../model';
import { FeedListWrapper } from '../feed-list';

export const FeedMain = () => {
  const {
    data: boards,
    feedListRef,
    selectedTab,
    filteredBoardIds,
    handleTabChange,
  } = useFeedMain();

  return (
    <VStack gap="md" className="min-h-0 flex-1">
      <Tab.Root
        variant="chip"
        value={selectedTab}
        onValueChange={handleTabChange}
      >
        <Tab.List className="px-5 md:px-0">
          <Tab.TabItem value={FEED_LIST_TAB.ALL}>전체</Tab.TabItem>
          {boards.map((board) => (
            <Tab.TabItem key={board.id} value={board.id}>
              {board.name}
            </Tab.TabItem>
          ))}
        </Tab.List>
      </Tab.Root>
      <FeedListWrapper boardIds={filteredBoardIds} ref={feedListRef} />
    </VStack>
  );
};
