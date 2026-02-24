import { mergeStyles, VStack } from '@causw/cds';

import { CalendarEventListPreview } from '@/widgets/calendar';
import {
  CeremonyListPreview,
  CeremonyRegisterBanner,
} from '@/widgets/ceremony';
import {
  NotificationHeader,
  NotificationPopupCard,
} from '@/widgets/notification';
import { UserGreeting } from '@/widgets/user';

import { QuickMenu } from '@/shared/ui';

//TODO : 새 알림 api 연동 -> header statusdot & newNotification 교체
//TODO : 해당 페이지 나오면 상세 페이지들 주소 수정
//TODO : 졸업생 정보
export function HomePage() {
  const newNotification = true;
  const isAlumni = false;
  return (
    <VStack className="tablet:gap-8 max-w-desktop tablet:px-8 tablet:pt-12 desktop:gap-6 w-full gap-2 px-4 pb-[2.125rem]">
      {/* Mobile Header */}
      <div className="tablet:hidden sticky top-0 z-10">
        <NotificationHeader />
      </div>

      {/* Desktop Greeting */}
      <div className="tablet:block hidden">
        <UserGreeting />
      </div>

      <VStack className="desktop:gap-6 gap-4">
        {newNotification && <NotificationPopupCard />}

        <div className="desktop:grid-cols-2 desktop:gap-x-6 desktop:gap-y-8 grid w-full grid-cols-1 gap-4">
          {isAlumni && (
            <div className="desktop:col-span-2 desktop:order-1 order-15">
              <CeremonyRegisterBanner />
            </div>
          )}
          {!isAlumni && <QuickMenu />}

          {!isAlumni && (
            <div
              className={mergeStyles(
                'order-15',
                'desktop:order-2',
                'desktop:col-start-2',
              )}
            >
              <CeremonyRegisterBanner />
            </div>
          )}
          <div className="order-10">
            <CalendarEventListPreview />
          </div>

          <div className="order-20">
            <CeremonyListPreview />
          </div>
        </div>
      </VStack>
    </VStack>
  );
}
