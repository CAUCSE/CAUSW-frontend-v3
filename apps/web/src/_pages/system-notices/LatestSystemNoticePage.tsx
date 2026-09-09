'use client';

import { LatestSystemNoticeDetailSection } from '@/widgets/system-notices';

import { ROUTES } from '@/shared/constants';
import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

export const LatestSystemNoticePage = () => {
  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-5 md:pb-5">
      <ActionHeader background="white">
        <ActionHeader.BackButton fallbackHref={ROUTES.NOTIFICATION}>
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
