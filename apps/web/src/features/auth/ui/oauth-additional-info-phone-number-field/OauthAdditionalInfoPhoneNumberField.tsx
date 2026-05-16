'use client';

import { OAUTH_ADDITIONAL_INFO_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

type PhoneNumberFieldProps = {
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberBlur: () => void;
};

export const OauthAdditionalInfoPhoneNumberField = ({
  onPhoneNumberChange,
  onPhoneNumberBlur,
}: PhoneNumberFieldProps) => {
  return (
    <RHFInput
      name={OAUTH_ADDITIONAL_INFO_FORM_FIELD.phoneNumber}
      label="연락처"
      placeholder="연락처를 입력해주세요."
      typography="body-16-regular"
      maxLength={13}
      onChange={onPhoneNumberChange}
      onBlur={onPhoneNumberBlur}
    />
  );
};
