import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import {
  NotificationListActionHeader,
  NotificationListSectionLoadingView,
  NotificationListSectionServerComponent,
} from '@/widgets/notification';

export function NotificationPage() {
  return (
    <div className="flex w-full justify-center">
      <VStack gap="sm" className="w-full max-w-225 p-4 md:px-8 md:py-6">
        <NotificationListActionHeader />
        <Suspense fallback={<NotificationListSectionLoadingView />}>
          <NotificationListSectionServerComponent />
        </Suspense>
      </VStack>
    </div>
  );
}
