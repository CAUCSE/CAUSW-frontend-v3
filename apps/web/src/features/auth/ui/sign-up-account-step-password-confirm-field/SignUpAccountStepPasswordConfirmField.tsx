'use client';

import { ACCOUNT_FORM_FIELD } from '@/entities/auth';

import { RHFPasswordInput } from '@/shared/ui';

export const SignUpAccountStepPasswordConfirmField = () => {
  return (
    <RHFPasswordInput
      name={ACCOUNT_FORM_FIELD.passwordConfirm}
      label="비밀번호 확인"
      placeholder="비밀번호를 다시 입력해주세요."
      typography="body-16-regular"
    />
  );
};
