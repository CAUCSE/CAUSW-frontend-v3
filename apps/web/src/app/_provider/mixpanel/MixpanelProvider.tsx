'use client';

import { useEffect, type PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { authQueryOptions } from '@/entities/auth';

import {
  attachMixpanelOnboardingUser,
  identifyMixpanelUser,
  syncMixpanelAcademicStatus,
} from '@/shared/lib/analytics';

export const MixpanelProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const { data: myInfo } = useQuery({
    ...authQueryOptions.me(),
    // 인증 화면과 OnboardingGuard가 조회한 결과만 구독한다.
    // 분석 로직에서 요청을 시작하면 로그아웃 중 토큰 갱신이 발생할 수 있다.
    enabled: false,
  });

  useEffect(() => {
    // 로그인 화면에는 이전 세션의 캐시가 잠시 남아 있을 수 있다.
    if (pathname?.startsWith('/auth/sign-in')) return;
    if (!myInfo?.id) return;
    identifyMixpanelUser(myInfo.id);
    if (
      myInfo.onboardingStatus === 'GUEST' ||
      myInfo.onboardingStatus === 'EMAIL_VERIFICATION_REQUIRED' ||
      myInfo.onboardingStatus === 'ACADEMIC_CERTIFICATION_REQUIRED'
    ) {
      attachMixpanelOnboardingUser(myInfo.id);
    }
    if (
      myInfo.onboardingStatus === 'ACTIVE' &&
      (myInfo.academicStatus === 'ENROLLED' ||
        myInfo.academicStatus === 'GRADUATED')
    ) {
      syncMixpanelAcademicStatus(myInfo.academicStatus);
    }
  }, [myInfo?.academicStatus, myInfo?.id, myInfo?.onboardingStatus, pathname]);

  return <>{children}</>;
};
