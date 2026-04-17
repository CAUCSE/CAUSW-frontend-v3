'use client';

import { Text, VStack } from '@causw/cds';

interface EmailVerificationHeaderProps {
  email: string;
}

export const EmailVerificationHeader = ({
  email,
}: EmailVerificationHeaderProps) => {
  return (
    <VStack justify="center" className="w-full gap-2">
      <VStack gap="none">
        <Text
          as="h1"
          typography="title-22-bold"
          textColor="gray-800"
          className="whitespace-pre-wrap"
        >
          더 안전한 서비스 이용을 위해
        </Text>
        <Text
          as="h1"
          typography="title-22-bold"
          textColor="gray-800"
          className="whitespace-pre-wrap"
        >
          이메일을 인증해 주세요.
        </Text>
      </VStack>
      <VStack gap="none">
        <Text typography="body-16-medium" textColor="gray-600">
          {email}로 인증 코드를 발송했어요.
        </Text>
        <Text typography="body-16-medium" textColor="gray-600">
          메일을 확인하고 인증 코드를 입력해주세요.
        </Text>
      </VStack>
    </VStack>
  );
};
