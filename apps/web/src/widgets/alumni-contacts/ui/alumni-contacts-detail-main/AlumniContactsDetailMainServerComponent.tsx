import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { AlumniContactsDetailMain } from './AlumniContactsDetailMain';

interface AlumniContactsDetailMainServerComponentProps {
  alumniContactsId: string;
}

export const AlumniContactsDetailMainServerComponent = async ({
  alumniContactsId,
}: AlumniContactsDetailMainServerComponentProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.LONG,
      },
    },
  });

  await queryClient.prefetchQuery(
    alumniContactsQueryOptions.detail({ alumniContactsId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlumniContactsDetailMain alumniContactsId={alumniContactsId} />
    </HydrationBoundary>
  );
};
