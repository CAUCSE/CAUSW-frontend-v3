'use client';
import { useState } from 'react';

import dynamic from 'next/dynamic';

import { VStack } from '@causw/cds';

import { CalendarEventListPreview } from '@/widgets/calendar';
import {
  CeremonyListPreview,
  CeremonyRegisterBanner,
} from '@/widgets/ceremony';
import {
  NotificationMobileHeader,
  // NotificationPopupCard,
} from '@/widgets/notification';
import { UserGreeting } from '@/widgets/user';

import { useAgreeTermsMutation } from '@/features/auth';

import { useBreakpoint } from '@/shared/hooks';
import { QuickMenu, SuspenseView } from '@/shared/ui';

const TermsBottomSheet = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsBottomSheet),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const TermsDialog = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsDialog),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

//TODO : 해당 페이지 나오면 상세 페이지들 주소 수정
//TODO : 졸업생 정보

export function HomePage() {
  const { isMobileSize } = useBreakpoint();
  const [isTermsAgreementClosed, setIsTermsAgreementClosed] = useState(false);
  const isAlumni = true;
  // TODO: 내 정보 조회 API 연결 후 onboardingStatus 값을 실제 데이터로 교체
  const onboardingStatus = 'TERMS_REQUIRED' as const;
  const shouldShowTermsAgreement =
    onboardingStatus === 'TERMS_REQUIRED' && !isTermsAgreementClosed;

  const handleTermsOpenChange = (open: boolean) => {
    if (!open) {
      setIsTermsAgreementClosed(true);
    }
  };

  const handleTermsAgreementSuccess = () => {
    setIsTermsAgreementClosed(true);
  };

  const agreeTermsMutation = useAgreeTermsMutation({
    onSuccess: handleTermsAgreementSuccess,
  });

  const handleSubmitTermsAgreement = async (params: { termsIds: string[] }) => {
    await agreeTermsMutation.mutateAsync(params);
  };

  return (
    <>
      <VStack className="tablet:gap-8 max-w-desktop tablet:px-8 tablet:pt-12 desktop:gap-6 mx-auto w-full gap-2 px-4 pb-[2.125rem]">
        {/* Mobile Header */}
        <div className="tablet:hidden sticky top-0 z-10">
          <NotificationMobileHeader />
        </div>

        {/* Desktop Greeting */}
        <div className="tablet:block hidden">
          <UserGreeting />
        </div>

        <VStack className="desktop:gap-6 gap-4">
          {/* TODO : 20260303 주석 처리 : 기획 및 api 변경으로 인해 임시 주석 -> api 수정 후에 다시 노출 (모든 알림 -> 서비스 공지로 수정) */}
          {/* <NotificationPopupCard /> */}
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

      {shouldShowTermsAgreement && isMobileSize && (
        <TermsBottomSheet
          open
          onOpenChange={handleTermsOpenChange}
          onSubmitTermsAgreement={handleSubmitTermsAgreement}
        />
      )}
      {shouldShowTermsAgreement && !isMobileSize && (
        <TermsDialog
          open
          onOpenChange={handleTermsOpenChange}
          onSubmitTermsAgreement={handleSubmitTermsAgreement}
        />
      )}
    </>
  );
}
