'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh, mergeStyles } from '@causw/cds';

import { PostWriteFloatingActionButton } from '@/features/post';

import { BOARD_GROUP, type Board, type BoardGroup } from '@/entities/board';
import {
  postQueryOptions,
  usePostViewMode,
  type PostCategory,
} from '@/entities/post';

import {
  useBreakpoint,
  useInfiniteScroll,
  useScrollDirectionVisibility,
} from '@/shared/hooks';

import {
  POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  POST_LIST_SCROLL_RESTORATION_STORAGE_KEY,
} from '../../config';
import { usePostListScrollRestoration } from '../../model';

import { PostList } from './PostList';

interface PostListWrapperProps {
  boardIds: Board['id'][];
  boardGroup: BoardGroup;
  category?: PostCategory;
}

export const PostListWrapper = ({
  boardIds,
  boardGroup,
  category,
}: PostListWrapperProps) => {
  const { postViewMode } = usePostViewMode();

  const scrollRestorationStorageKey =
    boardGroup === BOARD_GROUP.NOTICE
      ? POST_LIST_SCROLL_RESTORATION_STORAGE_KEY.NOTICE
      : POST_LIST_SCROLL_RESTORATION_STORAGE_KEY.COMMUNITY;

  const {
    data: posts,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useSuspenseInfiniteQuery({
    ...postQueryOptions.list({ boardIds, boardGroup, category }),
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

  const { isVisible: isBottomNavVisible } = useScrollDirectionVisibility({
    containerClassName: POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  });

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
          />
        </PullToRefresh>
        <PostWriteFloatingActionButton
          boardGroup={boardGroup}
          className={mergeStyles(
            !isBottomNavVisible &&
              'bottom-[max(1rem,var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px)))]',
          )}
        />
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
      />
      <PostWriteFloatingActionButton boardGroup={boardGroup} />
    </>
  );
};
