import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { alumniContactsQueryOptions } from '@/entities/alumni-contacts';

import { QUERY_STALE_TIME } from '@/shared/constants';
import { QueryErrorBoundary } from '@/shared/ui';

import { MyAlumniContactsMain } from './MyAlumniContactsMain';

export const MyAlumniContactsMainServerComponent = async () => {
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
      <QueryErrorBoundary fallbackMessage="프로필 정보를 불러오지 못했습니다.">
        <MyAlumniContactsMain />
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
};
