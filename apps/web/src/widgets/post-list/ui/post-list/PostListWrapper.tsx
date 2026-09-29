'use client';

import { useEffect, useRef } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh, mergeStyles } from '@causw/cds';

import { PostWriteFloatingActionButton } from '@/features/post';

import { BOARD_GROUP, type Board, type BoardGroup } from '@/entities/board';
import {
  POST_VIEW_MODE,
  POST_VIEW_MODE_STORAGE_KEY,
  postQueryOptions,
  usePostViewMode,
  type PostCategory,
} from '@/entities/post';

import {
  useBreakpoint,
  useInfiniteScroll,
  useScrollDirectionVisibility,
} from '@/shared/hooks';
import { trackMixpanelEvent } from '@/shared/lib/analytics';

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
  const viewedBoardGroupRef = useRef<BoardGroup | null>(null);

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

  useEffect(() => {
    if (!isSuccess || viewedBoardGroupRef.current === boardGroup) return;

    // The view-mode hook restores localStorage after mount. Read the persisted
    // value at tracking time so the first event uses the applied view mode.
    let persistedMode: string | null = null;
    try {
      persistedMode = window.localStorage.getItem(POST_VIEW_MODE_STORAGE_KEY);
    } catch {
      // Keep the in-memory mode when storage is unavailable.
    }
    const mode =
      persistedMode === JSON.stringify(POST_VIEW_MODE.CARD)
        ? POST_VIEW_MODE.CARD
        : persistedMode === JSON.stringify(POST_VIEW_MODE.COMPACT)
          ? POST_VIEW_MODE.COMPACT
          : postViewMode;

    viewedBoardGroupRef.current = boardGroup;
    trackMixpanelEvent({
      name:
        boardGroup === BOARD_GROUP.NOTICE ? 'feed_viewed' : 'community_viewed',
      properties: {
        view_mode: mode === POST_VIEW_MODE.CARD ? 'feed' : 'compact',
      },
    });
  }, [boardGroup, isSuccess, postViewMode]);

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
