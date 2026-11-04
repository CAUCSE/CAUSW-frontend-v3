import type { OnboardingStatus } from '@/entities/auth';

import {
  clearMixpanelAuthMethod,
  startMixpanelOnboarding,
} from '@/shared/lib/analytics';

export const syncMixpanelAfterSignIn = (onboardingStatus: OnboardingStatus) => {
  const isOnboardingInProgress =
    onboardingStatus === 'EMAIL_VERIFICATION_REQUIRED' ||
    onboardingStatus === 'GUEST';

  // 인증 신청/승인 대기 중 재로그인은 새로운 가입 시작이 아니다.
  // 최초 홈 도달을 확인할 수 있도록 기존 진행 상태는 유지한다.
  if (onboardingStatus === 'ACADEMIC_CERTIFICATION_REQUIRED') return;

  if (isOnboardingInProgress) {
    startMixpanelOnboarding();
    return;
  }

  clearMixpanelAuthMethod();
};
