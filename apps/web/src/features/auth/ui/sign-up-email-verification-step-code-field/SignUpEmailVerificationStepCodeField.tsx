'use client';

import { EMAIL_VERIFICATION_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const SignUpEmailVerificationStepCodeField = () => {
  return (
    <RHFInput
      name={EMAIL_VERIFICATION_FORM_FIELD.emailVerificationCode}
      label="인증 코드 (6자리)"
      typography="body-16-regular"
      maxLength={6}
      placeholder="인증 코드를 입력해주세요"
    />
  );
};
