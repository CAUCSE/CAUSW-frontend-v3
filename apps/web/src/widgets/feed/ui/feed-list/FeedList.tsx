'use client';

import { type RefObject } from 'react';

import { Separator, VStack } from '@causw/cds';

import { type FeedViewMode } from '@/entities/feed';
import { type GetPostsResponseDto } from '@/entities/post';

import { SuspenseView } from '@/shared/ui';

import { FeedListitem } from '../feed-list-item';

import { FeedListEmptyView } from './FeedListEmptyView';

interface FeedListProps {
  posts?: GetPostsResponseDto['posts'];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  ref: RefObject<HTMLUListElement | null>;
  viewMode: FeedViewMode;
}

export const FeedList = ({
  posts,
  isFetchingNextPage,
  hasNextPage,
  targetRef,
  ref,
  viewMode,
}: FeedListProps) => {
  if (!posts || posts.length === 0) {
    return <FeedListEmptyView />;
  }

  return (
    <VStack
      gap="none"
      className="min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-5 py-3 md:px-0"
      ref={ref}
      as="ul"
    >
      {posts?.map((post, index) => (
        <li key={post.postId}>
          <FeedListitem post={post} viewMode={viewMode} />
          {index < posts.length - 1 && (
            <Separator orientation="horizontal" className="my-4 bg-gray-100" />
          )}
        </li>
      ))}
      {!isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full shrink-0" />
      )}
      {isFetchingNextPage && <SuspenseView />}
    </VStack>
  );
};
