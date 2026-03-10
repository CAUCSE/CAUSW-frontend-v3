'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

type GuardStep = 'Account' | 'EmailVerification' | 'Info';

type UseSignUpStepGuardParams = {
  initialStep: GuardStep;
};

const SIGN_UP_ACCOUNT_URL = '/auth/sign-up?sign-up.step=Account';
const SIGN_UP_STEP_LEVEL_KEY = 'sign_up_step_level';

const STEP_LEVEL: Record<GuardStep, number> = {
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

  if (parsed < STEP_LEVEL.Account || parsed > STEP_LEVEL.Info) {
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
}: UseSignUpStepGuardParams) => {
  const router = useRouter();

  useEffect(() => {
    const allowedStepLevel = getAllowedStepLevel();

    if (allowedStepLevel === null) {
      setAllowedStepLevel(STEP_LEVEL.Account);
    }

    if (initialStep === 'Account') {
      return;
    }

    const currentAllowedStepLevel =
      allowedStepLevel === null ? STEP_LEVEL.Account : allowedStepLevel;
    if (currentAllowedStepLevel >= STEP_LEVEL[initialStep]) return;
    router.replace(SIGN_UP_ACCOUNT_URL);
  }, [initialStep, router]);

  const allowInfoStep = () => {
    setAllowedStepLevel(STEP_LEVEL.Info);
  };

  const allowEmailVerificationStep = () => {
    setAllowedStepLevel(STEP_LEVEL.EmailVerification);
  };

  return {
    allowEmailVerificationStep,
    allowInfoStep,
  };
};
