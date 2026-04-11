import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import type {  OnboardingStatus, UserMeResponseDto } from '@/entities/auth';

export const routeAfterSignIn = (
  router: AppRouterInstance,
  data: Pick<UserMeResponseDto, 'onboardingStatus'>,
) => {
  const AUTH_ROUTE_MAP: Record<OnboardingStatus, string> = {
    'EMAIL_VERIFICATION_REQUIRED': '/auth/sign-up/email-verification',
    'GUEST': '/auth/sign-up/oauth-additional-info',
    'ACADEMIC_CERTIFICATION_REQUIRED': '/auth/sign-up/enrollment-verification',
    'ACTIVE': '/home',
    'TERMS_REQUIRED': '/home',
  } as const;

  router.replace(AUTH_ROUTE_MAP[data.onboardingStatus]);
};
