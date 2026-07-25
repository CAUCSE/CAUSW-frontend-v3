import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { lockerQueryOptions } from '../../config';

import { LockerApplicationPeriodSection } from './LockerApplicationPeriodSection';

export const LockerApplicationPeriodSectionServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.DEFAULT,
      },
    },
  });

  await queryClient.prefetchQuery(lockerQueryOptions.lockerApplicationPeriod());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LockerApplicationPeriodSection />
    </HydrationBoundary>
  );
};
