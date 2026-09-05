'use client';

import { Tab } from '@causw/cds';

import { type Board } from '@/entities/board';

import { POST_LIST_TAB } from '../../config';

interface PostBoardTabsProps {
  boards: Board[];
  value: string;
  onValueChange: (value: string) => void;
}

export const PostBoardTabs = ({
  boards,
  value,
  onValueChange,
}: PostBoardTabsProps) => {
  return (
    <Tab.Root
      variant="chip"
      value={value}
      onValueChange={onValueChange}
      className="min-w-0 flex-1"
    >
      <Tab.List className="-mr-4 gap-1 pr-4 md:-mr-5 md:pr-5">
        <Tab.TabItem
          value={POST_LIST_TAB.ALL}
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
