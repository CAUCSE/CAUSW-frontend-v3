'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import {
  useSendEmailVerificationCodeMutation,
  useVerifyEmailVerificationCodeMutation,
} from '@/features/auth';

import {
  EMAIL_VERIFICATION_FORM_FIELD,
  type SignUpFormData,
} from '@/entities/auth';

import { trackMixpanelEvent } from '@/shared/lib/analytics';

export const useSignUpEmailVerificationStep = (onNext: () => void) => {
  const { control } = useFormContext<SignUpFormData>();
  const email =
    useWatch({ control, name: EMAIL_VERIFICATION_FORM_FIELD.email }) ?? '';
  const verificationCode =
    useWatch({
      control,
      name: EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode,
    }) ?? '';
  const sendEmailVerificationCodeMutation =
    useSendEmailVerificationCodeMutation();
  const verifyEmailVerificationCodeMutation =
    useVerifyEmailVerificationCodeMutation();

  const handleVerifyClick = () => {
    verifyEmailVerificationCodeMutation.mutate(
      {
        email,
        verificationCode,
      },
      {
        onSuccess: () => {
          trackMixpanelEvent({ name: 'email_verification_completed' });
          onNext();
        },
      },
    );
  };

  const handleResendClick = () => {
    if (sendEmailVerificationCodeMutation.isPending) return;

    sendEmailVerificationCodeMutation.mutate({ email });
  };

  return {
    email,
    handleVerifyClick,
    handleResendClick,
    isSendingCode: sendEmailVerificationCodeMutation.isPending,
    isVerifyingCode: verifyEmailVerificationCodeMutation.isPending,
  };
};
