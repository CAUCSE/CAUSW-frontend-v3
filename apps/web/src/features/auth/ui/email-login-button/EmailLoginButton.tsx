import type { ComponentProps } from 'react';

import { CTAButton } from '@causw/cds';

type EmailLoginButtonProps = ComponentProps<typeof CTAButton>;

export const EmailLoginButton = ({
  children,
  ...props
}: EmailLoginButtonProps) => {
  return (
    <CTAButton color="white" fullWidth {...props}>
      {children ?? '이메일로 시작하기'}
    </CTAButton>
  );
};
