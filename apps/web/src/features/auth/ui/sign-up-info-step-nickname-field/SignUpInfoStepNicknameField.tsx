'use client';

import { INFO_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

type SignUpInfoStepNicknameFieldProps = {
  onBlur: () => void;
};

export const SignUpInfoStepNicknameField = ({
  onBlur,
}: SignUpInfoStepNicknameFieldProps) => {
  return (
    <RHFInput
      name={INFO_FORM_FIELD.nickname}
      label="닉네임"
      placeholder="닉네임을 입력해주세요."
      typography="body-16-regular"
      onBlur={onBlur}
    />
  );
};
