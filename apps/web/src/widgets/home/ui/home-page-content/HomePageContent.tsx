'use client';

import { Suspense } from 'react';

import { Skeleton, VStack } from '@causw/cds';

import { CalendarEventListPreview } from '@/widgets/calendar';
import {
  CeremonyListPreview,
  CeremonyRegisterBanner,
} from '@/widgets/ceremony';
import {
  NotificationMobileHeader,
  // NotificationPopupCard,
} from '@/widgets/notification';
import { UserGreetingHeader } from '@/widgets/user';

import { useMyInfoSuspenseQuery } from '@/entities/auth';

import { QuickMenu } from '@/shared/ui';

export function HomePageContent() {
  const { data: myInfo } = useMyInfoSuspenseQuery();
  const isAlumni = myInfo.academicStatus === 'GRADUATED';

  return (
    <VStack className="tablet:gap-8 max-w-desktop tablet:px-8 tablet:pt-12 desktop:gap-6 mx-auto w-full gap-2 px-4 pb-[2.125rem]">
      <div className="tablet:hidden sticky top-0 z-10">
        <NotificationMobileHeader />
      </div>

      <div className="tablet:block hidden">
        <Suspense fallback={<Skeleton width={400} height={52} />}>
          <UserGreetingHeader />
        </Suspense>
      </div>

      <VStack className="desktop:gap-6 gap-4">
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

          <CalendarEventListPreview />

          <div className="desktop:hidden">
            <CeremonyRegisterBanner />
          </div>
          <CeremonyListPreview />
        </div>
      </VStack>
    </VStack>
  );
}
