import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { SettingOverview } from '@/widgets/setting';

import { authQueryOptions } from '@/entities/auth';

export async function SettingPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(authQueryOptions.me());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingOverview />
    </HydrationBoundary>
  );
}
