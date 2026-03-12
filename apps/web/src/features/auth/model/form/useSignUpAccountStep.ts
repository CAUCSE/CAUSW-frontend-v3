'use client';

import { useFormContext } from 'react-hook-form';

import { useSendEmailVerificationCodeMutation } from '@/features/auth';

import { ACCOUNT_FORM_FIELD, type SignUpFormData } from '@/entities/auth';

export const useSignUpAccountStep = (onNext: () => void) => {
  const { trigger, getValues } = useFormContext<SignUpFormData>();
  const sendEmailVerificationCodeMutation =
    useSendEmailVerificationCodeMutation();

  const handleNextClick = () => {
    if (sendEmailVerificationCodeMutation.isPending) return;

    trigger(Object.values(ACCOUNT_FORM_FIELD)).then((isValid) => {
      if (!isValid) return;

      sendEmailVerificationCodeMutation.mutate(
        {
          email: getValues(ACCOUNT_FORM_FIELD.email),
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
