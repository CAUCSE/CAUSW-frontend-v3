import { Suspense } from 'react';

import { HStack, VStack } from '@causw/cds';

import { CommunityMainServerComponent } from '@/widgets/community';

import { QueryErrorBoundary, SuspenseView } from '@/shared/ui';

export const CommunityPage = () => {
  return (
    <HStack className="size-full min-h-0 justify-center overflow-hidden md:overflow-visible">
      <VStack className="min-h-0 w-full min-w-0 md:px-5 xl:w-225">
        <VStack gap="none" className="min-h-0 min-w-0 flex-1">
          <QueryErrorBoundary fallbackMessage="게시글 목록을 불러오지 못했어요.">
            <Suspense fallback={<SuspenseView />}>
              <CommunityMainServerComponent />
            </Suspense>
          </QueryErrorBoundary>
        </VStack>
      </VStack>
    </HStack>
  );
};
