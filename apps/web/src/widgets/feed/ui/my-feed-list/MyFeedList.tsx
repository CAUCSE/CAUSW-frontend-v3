'use client';

import { useEffect, useRef } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { useMyFeedView } from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FeedListitem } from '../feed-list-item';

import { MyFeedListEmptyView } from './MyFeedListEmptyView';

const MY_FEED_LIST_DEFAULT_SIZE = 20;

export const MyFeedList = () => {
  const { myFeedView } = useMyFeedView();

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
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

  if (data.length === 0) {
    return <MyFeedListEmptyView myFeedView={myFeedView} />;
  }

  return (
    <VStack
      className="h-0 min-h-0 w-full max-w-full min-w-0 flex-1 overflow-y-auto px-4 py-2"
      as="ul"
      ref={myFeedListRef}
    >
      {data?.map((post) => (
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
