import { Flex, VStack } from '@causw/cds';

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
  const isAlumni = true;
  return (
    <Flex justify="center" align="center" className="w-full">
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
    </Flex>
  );
}
