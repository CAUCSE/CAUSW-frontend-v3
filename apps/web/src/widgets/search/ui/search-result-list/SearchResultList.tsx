'use client';

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { PostListItems, useFeedScrollRestoration } from '@/widgets/post-list';

import { type BoardGroup, boardQueryOptions } from '@/entities/feed';
import { postQueryOptions, usePostViewMode } from '@/entities/post';
import { useSearchKeyword } from '@/entities/search';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { SearchResultListEmptyView } from './SearchResultListEmptyView';

interface SearchResultListProps {
  boardGroup: BoardGroup;
  writeHref?: string;
}

export const SearchResultList = ({
  boardGroup,
  writeHref,
}: SearchResultListProps) => {
  const { searchKeyword } = useSearchKeyword();
  const { postViewMode } = usePostViewMode();

  const { data: boardIds } = useSuspenseQuery({
    ...boardQueryOptions.available({ boardGroup }),
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
      keyword: searchKeyword,
    }),
    select: (data) => data.pages.flatMap((page) => page.posts),
    enabled: !!searchKeyword,
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

  if (!searchKeyword) {
    return null;
  }

  if (isLoading) {
    return <SuspenseView />;
  }

  if (!posts || posts.length === 0) {
    return (
      <SearchResultListEmptyView
        keyword={searchKeyword}
        writeHref={writeHref}
      />
    );
  }

  return (
    <VStack
      className="min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 md:px-0"
      as="ul"
    >
      <PostListItems posts={posts} viewMode={postViewMode} />
      {!isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full shrink-0" />
      )}
      {isFetchingNextPage && <SuspenseView />}
    </VStack>
  );
};
