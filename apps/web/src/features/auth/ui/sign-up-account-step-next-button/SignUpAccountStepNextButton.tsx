'use client';

import { CTAButton } from '@causw/cds';

type SignUpAccountStepNextButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
};

export const SignUpAccountStepNextButton = ({
  disabled,
  isLoading,
  onClick,
}: SignUpAccountStepNextButtonProps) => {
  return (
    <CTAButton
      color="dark"
      fullWidth
      disabled={disabled}
      onClick={onClick}
      className="mt-16 md:mt-10"
    >
      {isLoading ? '전송 중...' : '다음'}
    </CTAButton>
  );
};
