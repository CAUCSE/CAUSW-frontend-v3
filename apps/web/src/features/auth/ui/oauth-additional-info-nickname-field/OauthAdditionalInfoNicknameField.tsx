'use client';

import { OAUTH_ADDITIONAL_INFO_FORM_FIELD } from '@/entities/auth';

import { RHFInput } from '@/shared/ui';

type OauthAdditionalInfoNicknameFieldProps = {
  onNicknameBlur: () => void;
};

export const OauthAdditionalInfoNicknameField = ({
  onNicknameBlur,
}: OauthAdditionalInfoNicknameFieldProps) => {
  return (
    <RHFInput
      name={OAUTH_ADDITIONAL_INFO_FORM_FIELD.nickname}
      label="닉네임"
      placeholder="닉네임을 입력해주세요."
      typography="body-16-regular"
      onBlur={onNicknameBlur}
    />
  );
};
