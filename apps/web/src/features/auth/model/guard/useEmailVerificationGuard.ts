'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import type { OnboardingStatus } from '@/entities/auth/model/types';

export type EmailVerificationOnboardingStatus = OnboardingStatus;

export const useEmailVerificationGuard = (
  onboardingStatus: OnboardingStatus | undefined,
) => {
  const router = useRouter();

  useEffect(() => {
    if (onboardingStatus === undefined) return;

    const redirectMap: Partial<Record<OnboardingStatus, string>> = {
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
