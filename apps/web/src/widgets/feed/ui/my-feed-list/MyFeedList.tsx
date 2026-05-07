'use client';

import { useEffect, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { useMyFeedView } from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { useInfiniteScroll } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

import { FeedListitem } from '../feed-list-item';

export const MyFeedList = () => {
  const { myFeedView } = useMyFeedView();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      ...postQueryOptions.myFeed(myFeedView, { size: 20 }),
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

  if (isLoading) {
    return <SuspenseView />;
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
