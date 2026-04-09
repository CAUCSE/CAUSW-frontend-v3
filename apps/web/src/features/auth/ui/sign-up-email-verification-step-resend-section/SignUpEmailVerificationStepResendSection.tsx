'use client';

import { HStack, Text } from '@causw/cds';

type SignUpEmailVerificationStepResendActionProps = {
  onClick: () => void;
};

export const SignUpEmailVerificationStepResendSection = ({
  onClick,
}: SignUpEmailVerificationStepResendActionProps) => {
  return (
    <HStack gap="none" justify="center">
      <Text typography="body-14-medium" textColor="gray-400">
        메일이 도착하지 않았나요?
      </Text>
      <button
        className="typo-body-14-medium cursor-pointer text-gray-400 underline"
        onClick={onClick}
      >
        재전송
      </button>
    </HStack>
  );
};
