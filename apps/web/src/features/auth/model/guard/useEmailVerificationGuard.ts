'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export type EmailVerificationOnboardingStatus =
  | 'EMAIL_VERIFICATION_REQUIRED'
  | 'GUEST'
  | 'ACADEMIC_CERTIFICATION_REQUIRED'
  | 'ACTIVE'
  | 'TERMS_REQUIRED';

export const useEmailVerificationGuard = (
  onboardingStatus: EmailVerificationOnboardingStatus,
) => {
  const router = useRouter();

  useEffect(() => {
    const redirectMap: Partial<
      Record<EmailVerificationOnboardingStatus, string>
    > = {
      GUEST: '/auth/sign-up/oauth-additional-info',
      ACADEMIC_CERTIFICATION_REQUIRED: '/auth/enrollment-verification',
      ACTIVE: '/home',
      TERMS_REQUIRED: '/home',
    };

    const redirectPath = redirectMap[onboardingStatus];

    if (redirectPath) {
      router.replace(redirectPath);
    }
  }, [onboardingStatus, router]);
};
