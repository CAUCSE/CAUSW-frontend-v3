'use client';

import { type RefObject } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh } from '@causw/cds';

import { PostWriteFloatingActionButton } from '@/features/post';

import { type Board } from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { useBreakpoint, useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FeedList } from './FeedList';

interface FeedListWrapperProps {
  boardIds: Board['id'][];
  ref: RefObject<HTMLUListElement | null>;
}

export const FeedListWrapper = ({ boardIds, ref }: FeedListWrapperProps) => {
  const {
    data: posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
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

  const { isMobileSize } = useBreakpoint();

  if (isLoading) {
    return <SuspenseView />;
  }

  if (isMobileSize) {
    return (
      <>
        <PullToRefresh
          className="min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden"
          onRefresh={async () => {
            await refetch();
          }}
        >
          <FeedList
            posts={posts}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            targetRef={targetRef}
            ref={ref}
          />
        </PullToRefresh>
        <PostWriteFloatingActionButton />
      </>
    );
  }

  return (
    <FeedList
      posts={posts}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      targetRef={targetRef}
      ref={ref}
    />
  );
};
