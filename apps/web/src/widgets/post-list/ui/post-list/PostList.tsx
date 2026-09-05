'use client';

import { type RefObject } from 'react';

import { VStack } from '@causw/cds';

import { type BoardGroup } from '@/entities/board';
import { type GetPostsResponseDto, type PostViewMode } from '@/entities/post';

import { SuspenseView } from '@/shared/ui';

import { type PostListScrollRestorationStorageKey } from '../../config';
import { PostListItems } from '../post-list-items';

import { PostListEmptyView } from './PostListEmptyView';

interface PostListProps {
  posts?: GetPostsResponseDto['posts'];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  viewMode: PostViewMode;
  scrollRestorationStorageKey: PostListScrollRestorationStorageKey;
  boardGroup: BoardGroup;
}

export const PostList = ({
  posts,
  isFetchingNextPage,
  hasNextPage,
  targetRef,
  viewMode,
  scrollRestorationStorageKey,
  boardGroup,
}: PostListProps) => {
  if (!posts || posts.length === 0) {
    return <PostListEmptyView />;
  }

  return (
    <VStack
      gap="none"
      className="min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-5 py-3 md:overflow-visible md:px-0"
      as="ul"
    >
      <PostListItems
        posts={posts}
        viewMode={viewMode}
        scrollRestorationStorageKey={scrollRestorationStorageKey}
        boardGroup={boardGroup}
        separatorClassName="my-4 bg-gray-100"
      />
      {!isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full shrink-0" />
      )}
      {isFetchingNextPage && <SuspenseView />}
    </VStack>
  );
};
