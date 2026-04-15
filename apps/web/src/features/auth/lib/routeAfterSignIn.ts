import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import type { OnboardingStatus } from '@/entities/auth';

export const routeAfterSignIn = (
  router: AppRouterInstance,
  onboardingStatus: OnboardingStatus,
) => {
  const AUTH_ROUTE_MAP: Record<OnboardingStatus, string> = {
    EMAIL_VERIFICATION_REQUIRED: '/auth/sign-up/email-verification',
    GUEST: '/auth/sign-up/oauth-additional-info',
    ACADEMIC_CERTIFICATION_REQUIRED: '/auth/enrollment-verification',
    ACTIVE: '/home',
    TERMS_REQUIRED: '/home',
  } as const;

  router.push(AUTH_ROUTE_MAP[onboardingStatus]);
};
