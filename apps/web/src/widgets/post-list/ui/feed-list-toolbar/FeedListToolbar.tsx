import { HStack } from '@causw/cds';

import { type Board, type FeedViewMode } from '@/entities/feed';

import { FeedBoardTabs } from '../feed-board-tabs';
import { FeedViewModeToggle } from '../feed-view-mode-toggle';

interface FeedListToolbarProps {
  feedViewMode: FeedViewMode;
  onFeedViewModeChange: (value: FeedViewMode) => void;
  boards: Board[];
  selectedTab: string;
  onSelectedTabChange: (value: string) => void;
}

export const FeedListToolbar = ({
  feedViewMode,
  onFeedViewModeChange,
  boards,
  selectedTab,
  onSelectedTabChange,
}: FeedListToolbarProps) => {
  return (
    <HStack align="center" gap="md" className="px-4 py-1 md:px-0">
      <FeedViewModeToggle
        value={feedViewMode}
        onChange={onFeedViewModeChange}
      />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      <FeedBoardTabs
        boards={boards}
        value={selectedTab}
        onValueChange={onSelectedTabChange}
      />
    </HStack>
  );
};
