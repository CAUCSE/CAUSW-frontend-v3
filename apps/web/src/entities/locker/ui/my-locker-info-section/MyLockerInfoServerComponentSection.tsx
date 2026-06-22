import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { lockerQueryOptions } from '../../config';

import { MyLockerInfoSection } from './MyLockerInfoSection';

export const MyLockerInfoServerComponentSection = async () => {
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
      <MyLockerInfoSection />
    </HydrationBoundary>
  );
};
