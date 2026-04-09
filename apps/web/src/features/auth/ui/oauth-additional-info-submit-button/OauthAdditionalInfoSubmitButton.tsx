'use client';

import { CTAButton } from '@causw/cds';

type OauthAdditionalInfoSubmitButtonProps = {
  disabled: boolean;
};

export const OauthAdditionalInfoSubmitButton = ({
  disabled,
}: OauthAdditionalInfoSubmitButtonProps) => {
  return (
    <CTAButton color="dark" fullWidth type="submit" disabled={disabled}>
      다음
    </CTAButton>
  );
};
