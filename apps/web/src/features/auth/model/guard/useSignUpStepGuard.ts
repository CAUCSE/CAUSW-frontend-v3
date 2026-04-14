'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export const SIGN_UP_STEP = Object.freeze({
  Account: 'Account',
  EmailVerification: 'EmailVerification',
  Info: 'Info',
} as const);

type GuardStep = (typeof SIGN_UP_STEP)[keyof typeof SIGN_UP_STEP];

type UseSignUpStepGuardParams = {
  initialStep: GuardStep;
  onResetToAccount?: () => void;
};

const SIGN_UP_ACCOUNT_URL = '/auth/sign-up?sign-up.step=Account';
export const SIGN_UP_STEP_LEVEL_KEY = 'sign_up_step_level';

export const SIGN_UP_STEP_LEVEL = Object.freeze({
  [SIGN_UP_STEP.Account]: 0,
  [SIGN_UP_STEP.EmailVerification]: 1,
  [SIGN_UP_STEP.Info]: 2,
} satisfies Record<GuardStep, number>);

const getAllowedStepLevel = () => {
  if (typeof window === 'undefined') return null;

  const saved = window.sessionStorage.getItem(SIGN_UP_STEP_LEVEL_KEY);
  if (saved === null) return null;

  const parsed = Number(saved);
  if (Number.isNaN(parsed)) return null;

  if (
    parsed < SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.Account] ||
    parsed > SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.Info]
  ) {
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

    if (
      navigationEntry?.type === 'reload' &&
      initialStep !== SIGN_UP_STEP.Account
    ) {
      setAllowedStepLevel(SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.Account]);
      onResetToAccount?.();
      return;
    }

    const allowedStepLevel = getAllowedStepLevel();

    if (allowedStepLevel === null) {
      setAllowedStepLevel(SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.Account]);
    }

    if (initialStep === SIGN_UP_STEP.Account) {
      return;
    }

    const currentAllowedStepLevel =
      allowedStepLevel === null
        ? SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.Account]
        : allowedStepLevel;
    if (currentAllowedStepLevel >= SIGN_UP_STEP_LEVEL[initialStep]) return;
    router.replace(SIGN_UP_ACCOUNT_URL);
  }, [initialStep, onResetToAccount, router]);

  const allowInfoStep = () => {
    setAllowedStepLevel(SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.Info]);
  };

  const allowEmailVerificationStep = () => {
    setAllowedStepLevel(SIGN_UP_STEP_LEVEL[SIGN_UP_STEP.EmailVerification]);
  };

  return {
    allowEmailVerificationStep,
    allowInfoStep,
  };
};
