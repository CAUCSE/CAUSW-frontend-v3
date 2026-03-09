'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

type GuardStep = 'Account' | 'EmailVerification' | 'Info';

type UseSignUpStepGuardParams = {
  initialStep: GuardStep;
};

const SIGN_UP_ACCOUNT_URL = '/auth/sign-up?step=account';
const SIGN_UP_STEP_LEVEL_KEY = 'sign_up_step_level';

const STEP_LEVEL: Record<GuardStep, number> = {
  Account: 0,
  EmailVerification: 1,
  Info: 2,
};

const getAllowedStepLevel = () => {
  if (typeof window === 'undefined') return STEP_LEVEL.Account;

  const saved = window.sessionStorage.getItem(SIGN_UP_STEP_LEVEL_KEY);
  const parsed = Number(saved);
  if (Number.isNaN(parsed)) return STEP_LEVEL.Account;

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
    if (initialStep === 'Account') {
      setAllowedStepLevel(STEP_LEVEL.Account);
      return;
    }

    if (getAllowedStepLevel() >= STEP_LEVEL[initialStep]) return;
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
