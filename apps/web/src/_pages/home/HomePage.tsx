import { VStack } from '@causw/cds';

import {
  HomeCeremonyList,
  HomeCeremonyBanner,
  HomeGreeting,
  HomeHeader,
  HomeNotificationCard,
  HomeQuickMenu,
  HomeScheduleList,
} from '@/widgets/home';

//TODO : 새 알림 api 연동 -> header statusdot & newNotification 교체
//TODO : 학식 메뉴 아이콘 교체
//TODO : 해당 페이지 나오면 상세 페이지들 주소 수정
//TODO : 졸업생 정보
export function HomePage() {
  const newNotification = true;
  const isAlumni = true;
  return (
    <VStack className="tablet:gap-8 tablet:px-8 tablet:pt-12 laptop:gap-6 gap-2 px-4 pb-[2.125rem]">
      {/* Mobile Header */}
      <div className="tablet:hidden sticky top-0 z-10">
        <HomeHeader />
      </div>

      {/* Desktop Greeting */}
      <div className="tablet:block hidden">
        <HomeGreeting />
      </div>

      <VStack className="desktop:gap-6 gap-4">
        {newNotification && <HomeNotificationCard />}

        {isAlumni && (
          <div className="desktop:block hidden">
            <HomeCeremonyBanner />
          </div>
        )}

        <div className="desktop:grid-cols-2 desktop:gap-x-6 desktop:gap-y-8 grid w-full grid-cols-1 gap-4">
          {!isAlumni && <HomeQuickMenu />}

          {!isAlumni && (
            <div className="desktop:block hidden">
              <HomeCeremonyBanner />
            </div>
          )}

          <HomeScheduleList />

          <div className="desktop:hidden">
            <HomeCeremonyBanner />
          </div>
          <HomeCeremonyList />
        </div>
      </VStack>
    </VStack>
  );
}
