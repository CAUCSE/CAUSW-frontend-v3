'use client';

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { Separator, VStack } from '@causw/cds';

import { FeedListitem, useFeedScrollRestoration } from '@/widgets/post-list';

import {
  boardQueryOptions,
  useFeedSearchKeyword,
  useFeedViewMode,
} from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FeedSearchResultListEmptyView } from './FeedSearchResultListEmptyView';

export const FeedSearchResultList = () => {
  const { feedSearchKeyword } = useFeedSearchKeyword();
  const { feedViewMode } = useFeedViewMode();

  const { data: boardIds } = useSuspenseQuery({
    ...boardQueryOptions.available(),
    select: (data) => data.boards.map((board) => board.id),
  });

  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...postQueryOptions.list({
      boardIds,
      keyword: feedSearchKeyword,
    }),
    select: (data) => data.pages.flatMap((page) => page.posts),
    enabled: !!feedSearchKeyword,
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
      {posts?.map((post, index) => (
        <li key={post.postId}>
          <FeedListitem post={post} viewMode={feedViewMode} />
          {index < posts.length - 1 && <Separator orientation="horizontal" />}
        </li>
      ))}
      {!isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full shrink-0" />
      )}
      {isFetchingNextPage && <SuspenseView />}
    </VStack>
  );
};
