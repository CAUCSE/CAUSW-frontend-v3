import type { ComponentProps } from 'react';

import { type CTAButton, Text } from '@causw/cds';

type EmailLoginButtonProps = ComponentProps<typeof CTAButton>;

export const EmailLoginButton = ({
  children,
  ...props
}: EmailLoginButtonProps) => {
  return (
    <Text
      textColor="gray-500"
      typography="body-15-medium"
      className="mt-1 cursor-pointer text-center"
      {...props}
    >
      {children ?? '이메일로 시작하기'}
    </Text>
  );
};
