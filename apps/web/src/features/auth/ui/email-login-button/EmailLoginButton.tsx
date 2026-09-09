import type { ComponentProps } from 'react';

import { Text } from '@causw/cds';

type EmailLoginButtonProps = ComponentProps<'button'>;

export const EmailLoginButton = ({ ...props }: EmailLoginButtonProps) => {
  return (
    <button {...props} className="mt-2 cursor-pointer">
      <Text
        textColor="gray-500"
        typography="body-14-medium"
        className="text-center"
      >
        이메일로 시작하기
      </Text>
    </button>
  );
};
