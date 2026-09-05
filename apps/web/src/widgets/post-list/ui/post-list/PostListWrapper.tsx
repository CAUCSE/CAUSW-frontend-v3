'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh } from '@causw/cds';

import { PostWriteFloatingActionButton } from '@/features/post';

import { BOARD_GROUP, type Board, type BoardGroup } from '@/entities/board';
import { postQueryOptions, usePostViewMode } from '@/entities/post';

import { useBreakpoint, useInfiniteScroll } from '@/shared/hooks';

import {
  POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  POST_LIST_SCROLL_RESTORATION_STORAGE_KEY,
} from '../../config';
import { usePostListScrollRestoration } from '../../model';

import { PostList } from './PostList';
import { PostListLoadingView } from './PostListLoadingView';

interface PostListWrapperProps {
  boardIds: Board['id'][];
  boardGroup: BoardGroup;
}

export const PostListWrapper = ({
  boardIds,
  boardGroup,
}: PostListWrapperProps) => {
  const { postViewMode } = usePostViewMode();

  const scrollRestorationStorageKey =
    boardGroup === BOARD_GROUP.NOTICE
      ? POST_LIST_SCROLL_RESTORATION_STORAGE_KEY.NOTICE
      : POST_LIST_SCROLL_RESTORATION_STORAGE_KEY.COMMUNITY;

  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    ...postQueryOptions.list({ boardIds, boardGroup }),
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

  usePostListScrollRestoration({
    storageKey: scrollRestorationStorageKey,
    enabled: isSuccess,
    posts,
  });

  const { isMobileSize } = useBreakpoint();

  if (isLoading) {
    return <PostListLoadingView />;
  }

  if (isMobileSize) {
    return (
      <>
        <PullToRefresh
          className={`${POST_LIST_SCROLL_CONTAINER_CLASS_NAME} min-h-0 w-full max-w-full min-w-0 flex-1 overflow-x-hidden`}
          onRefresh={async () => {
            await refetch();
          }}
        >
          <PostList
            posts={posts}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            targetRef={targetRef}
            viewMode={postViewMode}
            scrollRestorationStorageKey={scrollRestorationStorageKey}
            boardGroup={boardGroup}
          />
        </PullToRefresh>
        <PostWriteFloatingActionButton boardGroup={boardGroup} />
      </>
    );
  }

  return (
    <>
      <PostList
        posts={posts}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        targetRef={targetRef}
        viewMode={postViewMode}
        scrollRestorationStorageKey={scrollRestorationStorageKey}
        boardGroup={boardGroup}
      />
      <PostWriteFloatingActionButton boardGroup={boardGroup} />
    </>
  );
};
