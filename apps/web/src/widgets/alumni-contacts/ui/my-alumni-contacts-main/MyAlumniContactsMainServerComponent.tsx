import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { MyAlumniContactsMain } from './MyAlumniContactsMain';

export const MyAlumniContactsMainServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.NONE,
      },
    },
  });
  await queryClient.prefetchQuery(alumniContactsQueryOptions.my());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyAlumniContactsMain />
    </HydrationBoundary>
  );
};
