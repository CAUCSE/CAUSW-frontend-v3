'use client';

import { type RefObject } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { type Board } from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FeedListitem } from '../feed-list-item';

interface FeedListProps {
  boardIds: Board['id'][];
  ref: RefObject<HTMLUListElement | null>;
}

export const FeedList = ({ boardIds, ref }: FeedListProps) => {
  const {
    data: posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...postQueryOptions.list({ boardIds, size: 20 }),
    select: (data) => data.pages.flatMap((page) => page.posts),
  });

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return <SuspenseView />;
  }

  return (
    <VStack className="min-h-0 flex-1 overflow-y-auto" ref={ref} as="ul">
      {posts?.map((post) => (
        <li key={post.postId}>
          <FeedListitem post={post} />
        </li>
      ))}
      {!isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full shrink-0" />
      )}
      {isFetchingNextPage && <SuspenseView />}
    </VStack>
  );
};
