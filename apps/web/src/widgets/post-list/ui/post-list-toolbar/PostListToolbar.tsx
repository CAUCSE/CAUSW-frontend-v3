'use client';

import { HStack } from '@causw/cds';

import { type Board } from '@/entities/board';
import { type PostViewMode } from '@/entities/post';

import { PostBoardTabs } from '../post-board-tabs';
import { PostViewModeToggle } from '../post-view-mode-toggle';

interface PostListToolbarProps {
  postViewMode: PostViewMode;
  onPostViewModeChange: (value: PostViewMode) => void;
  boards: Board[];
  selectedTab: string;
  onSelectedTabChange: (value: string) => void;
}

export const PostListToolbar = ({
  postViewMode,
  onPostViewModeChange,
  boards,
  selectedTab,
  onSelectedTabChange,
}: PostListToolbarProps) => {
  return (
    <HStack align="center" gap="md" className="px-4 py-1 md:px-0">
      <PostViewModeToggle
        value={postViewMode}
        onChange={onPostViewModeChange}
      />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      <PostBoardTabs
        boards={boards}
        value={selectedTab}
        onValueChange={onSelectedTabChange}
      />
    </HStack>
  );
};
