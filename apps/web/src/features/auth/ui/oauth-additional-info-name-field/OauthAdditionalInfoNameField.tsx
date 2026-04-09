'use client';

import { OAUTH_ADDITIONAL_INFO_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

export const OauthAdditionalInfoNameField = () => {
  return (
    <RHFInput
      name={OAUTH_ADDITIONAL_INFO_FORM_FIELD.name}
      label="이름"
      placeholder="이름을 입력해주세요."
      typography="body-16-regular"
    />
  );
};
