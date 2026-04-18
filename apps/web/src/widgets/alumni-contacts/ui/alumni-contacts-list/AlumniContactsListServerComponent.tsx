import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import {
  type AlumniContactsFilter,
  AlumniContactsFilterSearchParam,
  alumniContactsQueryOptions,
} from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { type NextSearchParams } from '@/shared/types';

import { AlumniContactsListWrapper } from './AlumniContactsList';

export const AlumniContactsListServerComponent = async ({
  searchParams,
}: {
  searchParams: NextSearchParams<AlumniContactsFilter>;
}) => {
  const params = await searchParams;

  const query = AlumniContactsFilterSearchParam.parse(params);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.SHORT,
      },
    },
  });

  await queryClient.prefetchInfiniteQuery({
    ...alumniContactsQueryOptions.list(query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlumniContactsListWrapper />
    </HydrationBoundary>
  );
};
