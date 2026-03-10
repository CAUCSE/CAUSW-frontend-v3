'use client';

import { useFormContext } from 'react-hook-form';

import { useSendEmailVerificationCodeMutation } from '@/features/auth';

import { type SignUpFormData } from '@/entities/auth';

export const useSignUpAccountStep = (onNext: () => void) => {
  const { trigger, getValues } = useFormContext<SignUpFormData>();
  const sendEmailVerificationCodeMutation =
    useSendEmailVerificationCodeMutation();

  const handleNextClick = () => {
    if (sendEmailVerificationCodeMutation.isPending) return;

    void trigger(['email', 'password', 'passwordConfirm']).then((isValid) => {
      if (!isValid) return;

      sendEmailVerificationCodeMutation.mutate(
        {
          email: getValues('email'),
        },
        {
          onSuccess: () => {
            onNext();
          },
        },
      );
    });
  };

  return {
    handleNextClick,
    isSendingCode: sendEmailVerificationCodeMutation.isPending,
  };
};
