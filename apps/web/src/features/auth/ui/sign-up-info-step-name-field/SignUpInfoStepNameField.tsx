'use client';

import { INFO_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const SignUpInfoStepNameField = () => {
  return (
    <RHFInput
      name={INFO_FORM_FIELD.name}
      label="이름 (본명)"
      placeholder="이름을 입력해주세요."
      typography="body-16-regular"
    />
  );
};
