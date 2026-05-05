import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { SettingProfileImageSection } from './SettingProfileImageSection';

export const SettingProfileImageSectionServerComponent = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME.SHORT,
      },
    },
  });

  await queryClient.prefetchQuery(authQueryOptions.me());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingProfileImageSection />
    </HydrationBoundary>
  );
};
