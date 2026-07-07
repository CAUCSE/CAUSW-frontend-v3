import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { lockerQueryOptions } from '@/entities/locker';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { LockerLocationsInfoSection } from './LockerLocationsInfoSection';

export const LockerLocationInfoSectionServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchQuery(lockerQueryOptions.lockerLocations());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LockerLocationsInfoSection />
    </HydrationBoundary>
  );
};
