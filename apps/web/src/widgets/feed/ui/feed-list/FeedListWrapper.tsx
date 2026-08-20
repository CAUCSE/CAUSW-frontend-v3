'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh } from '@causw/cds';

import { PostWriteFloatingActionButton } from '@/features/post';

import { type Board, useFeedViewMode } from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { useBreakpoint, useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FEED_LIST_SCROLL_CONTAINER_CLASS_NAME } from '../../config';
import { useFeedScrollRestoration } from '../../model';

import { FeedList } from './FeedList';

interface FeedListWrapperProps {
  boardIds: Board['id'][];
}

export const FeedListWrapper = ({ boardIds }: FeedListWrapperProps) => {
  const { feedViewMode } = useFeedViewMode();

  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    ...postQueryOptions.list({ boardIds }),
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

  useFeedScrollRestoration({
    enabled: isSuccess,
    posts,
  });

  const { isMobileSize } = useBreakpoint();

  if (isLoading) {
    return <SuspenseView />;
  }

  if (isMobileSize) {
    return (
      <>
        <PullToRefresh
          className={`${FEED_LIST_SCROLL_CONTAINER_CLASS_NAME} min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden`}
          onRefresh={async () => {
            await refetch();
          }}
        >
          <FeedList
            posts={posts}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            targetRef={targetRef}
            viewMode={feedViewMode}
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
      viewMode={feedViewMode}
    />
  );
};
