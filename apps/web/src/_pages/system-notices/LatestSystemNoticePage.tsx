'use client';

import { LatestSystemNoticeDetailSection } from '@/widgets/system-notices';

import { ROUTES } from '@/shared/constants';
import { useBreakpoint } from '@/shared/hooks';
import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

export const LatestSystemNoticePage = () => {
  const { isMobileSize } = useBreakpoint();

  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-8 md:py-6">
      <ActionHeader background={isMobileSize ? 'white' : 'gray'}>
        <ActionHeader.BackButton fallbackHref={ROUTES.HOME}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <QueryErrorBoundary fallbackMessage="시스템 공지를 불러오지 못했어요.">
        <HydrationSuspense fallback={<SuspenseView />}>
          <LatestSystemNoticeDetailSection />
        </HydrationSuspense>
      </QueryErrorBoundary>
    </div>
  );
};
