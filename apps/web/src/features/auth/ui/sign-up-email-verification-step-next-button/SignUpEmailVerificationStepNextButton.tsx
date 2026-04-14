'use client';

import { CTAButton } from '@causw/cds';

type SignUpEmailVerificationStepNextButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
};

export const SignUpEmailVerificationStepNextButton = ({
  disabled,
  isLoading,
  onClick,
}: SignUpEmailVerificationStepNextButtonProps) => {
  return (
    <CTAButton color="dark" fullWidth onClick={onClick} disabled={disabled}>
      {isLoading ? '확인 중...' : '다음'}
    </CTAButton>
  );
};
