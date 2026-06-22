import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { lockerQueryOptions } from '../../config';

import { MyLockerInfo } from './MyLockerInfo';

export const MyLockerInfoServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchQuery(lockerQueryOptions.myLocker());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyLockerInfo />
    </HydrationBoundary>
  );
};
