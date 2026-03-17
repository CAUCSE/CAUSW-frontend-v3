'use client';

import { CTAButton } from '@causw/cds';

type SignUpInfoStepNextButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export const SignUpInfoStepNextButton = ({
  disabled,
  onClick,
}: SignUpInfoStepNextButtonProps) => {
  return (
    <CTAButton color="dark" fullWidth disabled={disabled} onClick={onClick}>
      다음
    </CTAButton>
  );
};
