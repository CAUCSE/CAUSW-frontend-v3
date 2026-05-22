import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { AlumniContactsEditForm } from './AlumniContactsEditForm';

export const AlumniContactsEditFormServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.SHORT,
      },
    },
  });
  await queryClient.prefetchQuery(alumniContactsQueryOptions.my());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlumniContactsEditForm />
    </HydrationBoundary>
  );
};
