import { Suspense } from 'react';

import { Spacer, Text, VStack } from '@causw/cds';

import {
  MyLockerInfoServerComponentSection,
  MyLockerInfoLoadingViewSection,
} from '@/entities/locker';

import { QueryErrorBoundary } from '@/shared/ui';

export const LockerListMain = () => {
  return (
    <VStack gap="none" className="px-0 md:px-5">
      <Text typography="title-22-bold" textColor="gray-700" className="pl-1">
        사물함 목록
      </Text>
      <Spacer size={4} />
      <QueryErrorBoundary fallbackMessage="사물함 정보를 불러오지 못했어요.">
        <Suspense fallback={<MyLockerInfoLoadingViewSection />}>
          <MyLockerInfoServerComponentSection />
        </Suspense>
      </QueryErrorBoundary>
    </VStack>
  );
};
