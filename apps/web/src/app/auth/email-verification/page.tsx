import { Suspense } from 'react';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { EmailVerificationPage } from '@/_pages/auth';

import { authQueryOptions } from '@/entities/auth';

import { SuspenseView } from '@/shared/ui';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(authQueryOptions.me());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SuspenseView />}>
        <EmailVerificationPage />
      </Suspense>
    </HydrationBoundary>
  );
}
