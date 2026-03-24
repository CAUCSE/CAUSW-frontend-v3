'use client';

import { INFO_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

type SignUpInfoStepPhoneNumberFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export const SignUpInfoStepPhoneNumberField = ({
  onChange,
  onBlur,
}: SignUpInfoStepPhoneNumberFieldProps) => {
  return (
    <RHFInput
      name={INFO_FORM_FIELD.phoneNumber}
      label="연락처"
      placeholder="연락처를 입력해주세요. (010-XXXX-XXXX)"
      typography="body-16-regular"
      maxLength={13}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
