'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

type SignUpStep = 'Account' | 'Info';

type UseSignUpStepGuardParams = {
  initialStep: SignUpStep;
};

const SIGN_UP_ACCOUNT_URL = '/auth/sign-up?step=account';
const SIGN_UP_INFO_URL = '/auth/sign-up?step=info';

export const useSignUpStepGuard = ({
  initialStep,
}: UseSignUpStepGuardParams) => {
  const router = useRouter();
  const canEnterInfoRef = useRef(false);
  const hasRedirectedUnauthorizedInfoRef = useRef(false);

  useEffect(() => {
    if (initialStep !== 'Info') return;
    if (hasRedirectedUnauthorizedInfoRef.current) return;
    if (canEnterInfoRef.current) return;

    hasRedirectedUnauthorizedInfoRef.current = true;
    router.replace(SIGN_UP_ACCOUNT_URL);
  }, [initialStep, router]);

  const allowInfoStep = () => {
    canEnterInfoRef.current = true;
  };

  const syncInfoStepUrl = () => {
    router.push(SIGN_UP_INFO_URL);
  };

  return {
    allowInfoStep,
    syncInfoStepUrl,
  };
};
