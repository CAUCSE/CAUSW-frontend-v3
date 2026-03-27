'use client';

import { Text, VStack } from '@causw/cds';

type SignUpEmailVerificationStepHeaderProps = {
  email: string;
};

export const SignUpEmailVerificationStepHeader = ({
  email,
}: SignUpEmailVerificationStepHeaderProps) => {
  return (
    <VStack justify="center" className="w-full gap-2">
      <Text
        as="h1"
        typography="title-22-bold"
        textColor="gray-800"
        className="whitespace-pre-wrap"
      >
        이메일 인증하기
      </Text>
      <VStack gap="none">
        <Text typography="body-16-medium" textColor="gray-600">
          {email || '입력한 이메일'}로 인증 코드를 발송했어요.
        </Text>
        <Text typography="body-16-medium" textColor="gray-600">
          메일을 확인하고 인증 코드를 입력해주세요.
        </Text>
      </VStack>
    </VStack>
  );
};
