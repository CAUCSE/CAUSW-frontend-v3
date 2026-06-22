import { Suspense } from 'react';

import { Spacer, Text, VStack } from '@causw/cds';

import {
  MyLockerInfoServerComponentSection,
  MyLockerInfoLoadingViewSection,
  LockerApplicationPeriodSectionLoadingView,
  LockerApplicationPeriodSectionServerComponent,
} from '@/entities/locker';

import { QueryErrorBoundary } from '@/shared/ui';

import {
  LockerLocationInfoSectionLoadingView,
  LockerLocationInfoSectionServerComponent,
} from '../locker-locations-info-section';

export const LockerListMain = () => {
  return (
    <VStack gap="none" className="px-5">
      <Text typography="title-22-bold" textColor="gray-700" className="pl-1">
        사물함 목록
      </Text>
      <Spacer size={4} />
      <QueryErrorBoundary fallbackMessage="사물함 정보를 불러오지 못했어요.">
        <Suspense fallback={<MyLockerInfoLoadingViewSection />}>
          <MyLockerInfoServerComponentSection />
        </Suspense>
      </QueryErrorBoundary>
      <Spacer size={8} />
      <QueryErrorBoundary fallbackMessage="각 층별 사물함 정보를 불러오지 못했어요.">
        <Suspense fallback={<LockerLocationInfoSectionLoadingView />}>
          <LockerLocationInfoSectionServerComponent />
        </Suspense>
      </QueryErrorBoundary>
      <Spacer size={8} />
      <QueryErrorBoundary fallbackMessage="사물함 신청 기간 정보를 불러오지 못했어요.">
        <Suspense fallback={<LockerApplicationPeriodSectionLoadingView />}>
          <LockerApplicationPeriodSectionServerComponent />
        </Suspense>
      </QueryErrorBoundary>
    </VStack>
  );
};
