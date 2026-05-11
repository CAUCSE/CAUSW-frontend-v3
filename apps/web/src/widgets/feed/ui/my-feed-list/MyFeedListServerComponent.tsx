import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { MyFeedList } from '@/widgets/feed/ui/my-feed-list/MyFeedList';

import { type MyFeedView } from '@/entities/feed';
import { postQueryOptions } from '@/entities/post';

import { QUERY_STALE_TIME } from '@/shared/constants';

interface MyFeedListServerComponentProps {
  myFeedView: MyFeedView;
}

export const MyFeedListServerComponent = async ({
  myFeedView,
}: MyFeedListServerComponentProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchInfiniteQuery(
    postQueryOptions.myFeed(myFeedView, { size: 20 }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyFeedList />
    </HydrationBoundary>
  );
};
