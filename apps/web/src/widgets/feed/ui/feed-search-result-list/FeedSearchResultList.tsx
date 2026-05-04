'use client';

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { boardQueryOptions } from '@/entities/feed';
import { useFeedSearchKeyword } from '@/entities/feed/model/hooks';
import { postQueryOptions } from '@/entities/post';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FeedListitem } from '../feed-list-item';

import { FeedSearchResultListEmptyView } from './FeedSearchResultListEmptyView';

export const FeedSearchResultList = () => {
  const { feedSearchKeyword } = useFeedSearchKeyword();

  const { data: boardIds } = useSuspenseQuery({
    ...boardQueryOptions.available(),
    select: (data) => data.boards.map((board) => board.id),
  });

  const {
    data: posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...postQueryOptions.list({
      boardIds,
      keyword: feedSearchKeyword,
    }),
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

  if (!feedSearchKeyword) {
    return null;
  }

  if (isLoading) {
    return <SuspenseView />;
  }

  if (!posts || posts.length === 0) {
    return <FeedSearchResultListEmptyView keyword={feedSearchKeyword} />;
  }

  return (
    <VStack
      className="min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 md:px-0"
      as="ul"
    >
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
