import { Suspense } from 'react';

import { HStack, VStack } from '@causw/cds';

import { FeedHeader, FeedMainServerComponent } from '@/widgets/feed';

import { SuspenseView } from '@/shared/ui';

export const FeedPage = () => {
  return (
    <HStack className="size-full min-h-0 justify-center overflow-hidden">
      <VStack className="min-h-0 w-full py-4 md:px-8 md:py-6 xl:w-225">
        <VStack className="min-h-0 flex-1 gap-3">
          <FeedHeader />
          <Suspense fallback={<SuspenseView />}>
            <FeedMainServerComponent />
          </Suspense>
        </VStack>
      </VStack>
    </HStack>
  );
};
