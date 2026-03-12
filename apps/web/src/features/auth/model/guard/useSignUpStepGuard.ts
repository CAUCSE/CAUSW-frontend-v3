'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

type GuardStep = 'Account' | 'EmailVerification' | 'Info';

type UseSignUpStepGuardParams = {
  initialStep: GuardStep;
  onResetToAccount?: () => void;
};

const SIGN_UP_ACCOUNT_URL = '/auth/sign-up?sign-up.step=Account';
export const SIGN_UP_STEP_LEVEL_KEY = 'sign_up_step_level';

export const SIGN_UP_STEP_LEVEL: Record<GuardStep, number> = {
  Account: 0,
  EmailVerification: 1,
  Info: 2,
};

const getAllowedStepLevel = () => {
  if (typeof window === 'undefined') return null;

  const saved = window.sessionStorage.getItem(SIGN_UP_STEP_LEVEL_KEY);
  if (saved === null) return null;

  const parsed = Number(saved);
  if (Number.isNaN(parsed)) return null;

  if (parsed < SIGN_UP_STEP_LEVEL.Account || parsed > SIGN_UP_STEP_LEVEL.Info) {
    return null;
  }

  return parsed;
};

const setAllowedStepLevel = (level: number) => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(SIGN_UP_STEP_LEVEL_KEY, String(level));
};

export const useSignUpStepGuard = ({
  initialStep,
  onResetToAccount,
}: UseSignUpStepGuardParams) => {
  const router = useRouter();

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigationEntry?.type === 'reload' && initialStep !== 'Account') {
      setAllowedStepLevel(SIGN_UP_STEP_LEVEL.Account);
      onResetToAccount?.();
      return;
    }

    const allowedStepLevel = getAllowedStepLevel();

    if (allowedStepLevel === null) {
      setAllowedStepLevel(SIGN_UP_STEP_LEVEL.Account);
    }

    if (initialStep === 'Account') {
      return;
    }

    const currentAllowedStepLevel =
      allowedStepLevel === null ? SIGN_UP_STEP_LEVEL.Account : allowedStepLevel;
    if (currentAllowedStepLevel >= SIGN_UP_STEP_LEVEL[initialStep]) return;
    router.replace(SIGN_UP_ACCOUNT_URL);
  }, [initialStep, onResetToAccount, router]);

  const allowInfoStep = () => {
    setAllowedStepLevel(SIGN_UP_STEP_LEVEL.Info);
  };

  const allowEmailVerificationStep = () => {
    setAllowedStepLevel(SIGN_UP_STEP_LEVEL.EmailVerification);
  };

  return {
    allowEmailVerificationStep,
    allowInfoStep,
  };
};
