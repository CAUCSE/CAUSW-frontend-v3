'use client';

import { Suspense } from 'react';

import { VStack } from '@causw/cds';

import { HomeCalendar } from '@/widgets/calendar';
import {
  CeremonyListPreview,
  CeremonyRegisterBanner,
} from '@/widgets/ceremony';
import { NotificationBell } from '@/widgets/notification';
import { LatestSystemNoticePopupCard } from '@/widgets/system-notices';

import { useMyInfoSuspenseQuery } from '@/entities/auth';

import { QuickMenu } from '@/shared/ui';

export function HomePageContent() {
  const { data: myInfo } = useMyInfoSuspenseQuery();
  const isAlumni = myInfo.academicStatus === 'GRADUATED';

  return (
    <div className="tablet:px-5 tablet:pt-5 min-h-full bg-white">
      <div className="max-w-desktop tablet:pb-8 mx-auto w-full pb-(--mobile-nav-clearance)">
        <HomeCalendar
          headerAction={<NotificationBell />}
          banner={
            <Suspense fallback={null}>
              <LatestSystemNoticePopupCard />
            </Suspense>
          }
        />

        <VStack className="desktop:gap-6 gap-4 px-4 pt-4">
          {isAlumni && (
            <div className="desktop:block hidden">
              <CeremonyRegisterBanner />
            </div>
          )}

          <div className="desktop:grid-cols-2 desktop:gap-x-6 desktop:gap-y-8 grid w-full grid-cols-1 gap-4">
            {!isAlumni && <QuickMenu />}

            {!isAlumni && (
              <div className="desktop:block hidden">
                <CeremonyRegisterBanner />
              </div>
            )}

            <div className="desktop:hidden">
              <CeremonyRegisterBanner />
            </div>
            <CeremonyListPreview />
          </div>
        </VStack>
      </div>
    </div>
  );
}
