import type { OnboardingStatus } from '@/entities/auth';

import {
  clearMixpanelAuthMethod,
  startMixpanelOnboarding,
} from '@/shared/lib/analytics';

export const syncMixpanelAfterSignIn = (onboardingStatus: OnboardingStatus) => {
  const isOnboardingInProgress =
    onboardingStatus === 'EMAIL_VERIFICATION_REQUIRED' ||
    onboardingStatus === 'GUEST' ||
    onboardingStatus === 'ACADEMIC_CERTIFICATION_REQUIRED';

  if (isOnboardingInProgress) {
    startMixpanelOnboarding();
    return;
  }

  clearMixpanelAuthMethod();
};
