import { Suspense } from 'react';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import { SettingTermsDialog, SettingTermsHeader } from '@/widgets/setting';

import { authQueryOptions } from '@/entities/auth';
import { SettingTermsList } from '@/entities/setting';

import { SuspenseView } from '@/shared/ui';

export const SettingTermsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(authQueryOptions.terms());

  return (
    <VStack gap="sm" className="min-h-screen w-full pb-10">
      <SettingTermsHeader />
      <VStack className="h-full w-full px-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<SuspenseView />}>
            <SettingTermsList />
          </Suspense>
        </HydrationBoundary>
      </VStack>
      <SettingTermsDialog />
    </VStack>
  );
};
