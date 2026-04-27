'use client';

import { useMemo, useState } from 'react';

import { Tab, VStack } from '@causw/cds';

import { useGetAvailableBoards } from '@/entities/feed';

import { FeedList } from '../feed-list';

export const FeedMain = () => {
  const { data } = useGetAvailableBoards();

  const [selectedTab, setSelectedTab] = useState<string>('all');

  const filteredBoardIds = useMemo(() => {
    if (selectedTab === 'all') {
      return data.boards.map((board) => board.id);
    }
    return data.boards
      .filter((board) => board.id === selectedTab)
      .map((board) => board.id);
  }, [selectedTab, data.boards]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <VStack gap="md">
      <Tab.Root
        variant="chip"
        value={selectedTab}
        onValueChange={handleTabChange}
      >
        <Tab.List>
          <Tab.TabItem value="all">전체</Tab.TabItem>
          {data.boards.map((board) => (
            <Tab.TabItem key={board.id} value={board.id}>
              {board.name}
            </Tab.TabItem>
          ))}
        </Tab.List>
      </Tab.Root>
      <FeedList boardIds={filteredBoardIds} />
    </VStack>
  );
};
