'use client';

import { HStack } from '@causw/cds';

import { PostViewModeToggle } from '@/widgets/post-list';

import { usePostViewMode } from '@/entities/post';

import { MyFeedViewTab } from '../my-feed-view-tab';

export const MyFeedListToolbar = () => {
  const { postViewMode, setPostViewMode } = usePostViewMode();

  return (
    <HStack align="center" className="shrink-0 gap-3 overflow-x-auto px-4 py-1">
      <PostViewModeToggle value={postViewMode} onChange={setPostViewMode} />
      <div className="h-3 w-px shrink-0 bg-gray-300" />
      <MyFeedViewTab />
    </HStack>
  );
};
