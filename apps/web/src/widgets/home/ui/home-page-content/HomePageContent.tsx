'use client';

import { Suspense } from 'react';

import { HomeCalendar } from '@/widgets/calendar';
import { NotificationBell } from '@/widgets/notification';
import { LatestSystemNoticePopupCard } from '@/widgets/system-notices';

import { useMyInfoSuspenseQuery } from '@/entities/auth';

import { HomeActionSections } from './HomeActionSections';

export function HomePageContent() {
  const { data: myInfo } = useMyInfoSuspenseQuery();

  return (
    <div className="tablet:px-5 tablet:pt-5 min-h-full bg-white">
      <div className="max-w-desktop tablet:pb-8 mx-auto w-full pb-(--mobile-nav-clearance)">
        <HomeCalendar
          key={myInfo.id}
          userId={myInfo.id}
          headerAction={<NotificationBell />}
          banner={
            <Suspense fallback={null}>
              <LatestSystemNoticePopupCard />
            </Suspense>
          }
        />

        <HomeActionSections isEnrolled={myInfo.academicStatus === 'ENROLLED'} />
      </div>
    </div>
  );
}
