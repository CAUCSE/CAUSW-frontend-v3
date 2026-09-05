'use client';

import { useEffect, useRef } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import {
  POST_LIST_SCROLL_RESTORATION_STORAGE_KEY,
  PostListItems,
  usePostListScrollRestoration,
} from '@/widgets/post-list';

import { BOARD_GROUP } from '@/entities/board';
import { useMyFeedView } from '@/entities/my-feed';
import { postQueryOptions, usePostViewMode } from '@/entities/post';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { MyFeedListEmptyView } from './MyFeedListEmptyView';

const MY_FEED_LIST_DEFAULT_SIZE = 20;

export const MyFeedList = () => {
  const { myFeedView } = useMyFeedView();
  const { postViewMode } = usePostViewMode();

  const { data, isFetchingNextPage, isSuccess, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      ...postQueryOptions.myFeed(myFeedView, {
        size: MY_FEED_LIST_DEFAULT_SIZE,
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

  const myFeedListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (myFeedListRef.current && myFeedView) {
      myFeedListRef.current.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, [myFeedView]);

  usePostListScrollRestoration({
    storageKey: POST_LIST_SCROLL_RESTORATION_STORAGE_KEY.MY_FEED,
    enabled: isSuccess,
    posts: data,
  });

  if (data.length === 0) {
    return <MyFeedListEmptyView myFeedView={myFeedView} />;
  }

  return (
    <VStack
      className="min-h-0 w-full max-w-full min-w-0 flex-1 overflow-y-auto px-5 py-4 md:overflow-visible"
      as="ul"
      ref={myFeedListRef}
    >
      <PostListItems
        posts={data}
        viewMode={postViewMode}
        scrollRestorationStorageKey={
          POST_LIST_SCROLL_RESTORATION_STORAGE_KEY.MY_FEED
        }
        boardGroup={BOARD_GROUP.COMMUNITY}
      />
      {!isFetchingNextPage && hasNextPage && (
        <div ref={targetRef} className="h-3 w-full shrink-0" />
      )}
      {isFetchingNextPage && <SuspenseView />}
    </VStack>
  );
};
