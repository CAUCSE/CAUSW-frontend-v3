'use client';

import { ACCOUNT_FORM_FIELD } from '@/entities/auth';

import { RHFPasswordInput } from '@/shared/ui';

export const SignUpAccountStepPasswordField = () => {
  return (
    <RHFPasswordInput
      name={ACCOUNT_FORM_FIELD.password}
      label="비밀번호"
      placeholder="비밀번호를 입력해주세요."
      typography="body-16-regular"
    />
  );
};
