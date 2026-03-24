'use client';

import { ACCOUNT_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const SignUpAccountStepEmailField = () => {
  return (
    <RHFInput
      name={ACCOUNT_FORM_FIELD.email}
      label="이메일"
      placeholder="이메일을 입력해주세요."
      typography="body-16-regular"
    />
  );
};
