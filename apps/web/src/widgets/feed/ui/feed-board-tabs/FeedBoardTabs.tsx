import { Tab } from '@causw/cds';

import { type Board } from '@/entities/feed';

import { FEED_LIST_TAB } from '../../config';

interface FeedBoardTabsProps {
  boards: Board[];
  value: string;
  onValueChange: (value: string) => void;
}

export const FeedBoardTabs = ({
  boards,
  value,
  onValueChange,
}: FeedBoardTabsProps) => {
  return (
    <Tab.Root
      variant="chip"
      value={value}
      onValueChange={onValueChange}
      className="min-w-0 flex-1"
    >
      <Tab.List className="gap-1">
        <Tab.TabItem
          value={FEED_LIST_TAB.ALL}
          className="typo-body-14-semibold! rounded-md px-2.5 py-1 aria-[selected=false]:text-gray-400"
        >
          전체
        </Tab.TabItem>
        {boards.map((board) => (
          <Tab.TabItem
            key={board.id}
            value={board.id}
            className="typo-body-14-semibold! rounded-md px-2.5 py-1 aria-[selected=false]:text-gray-400"
          >
            {board.name}
          </Tab.TabItem>
        ))}
      </Tab.List>
    </Tab.Root>
  );
};
