import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';
import { authQueryOptions } from '@/entities/auth';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryErrorBoundary } from '@/shared/ui';

import { AlumniContactsEditForm } from './AlumniContactsEditForm';

export const AlumniContactsEditFormServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.SHORT,
      },
    },
  });
  await Promise.all([
    queryClient.prefetchQuery(alumniContactsQueryOptions.my()),
    queryClient.prefetchQuery(authQueryOptions.me()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary fallbackMessage="프로필 정보를 불러오지 못했습니다.">
        <AlumniContactsEditForm />
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
};
