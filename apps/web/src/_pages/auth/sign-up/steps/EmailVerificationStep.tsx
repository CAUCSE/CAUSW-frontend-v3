'use client';

import { Text, CTAButton, VStack, HStack } from '@causw/cds';

import { RHFInput } from '@/shared/ui';

export const EmailVerificationStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <VStack className="gap-14 md:gap-10">
      <VStack className="w-full gap-7">
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
              ccssaa@cau.ac.kr로 인증 코드를 발송했어요.
            </Text>
            <Text typography="body-16-medium" textColor="gray-600">
              메일을 확인하고 인증 코드를 입력해주세요.
            </Text>
          </VStack>
        </VStack>

        <RHFInput
          name="email"
          label="인증 코드 (6자리)"
          typography="body-16-regular"
          placeholder="인증 코드를 입력해주세요"
        />
      </VStack>
      <VStack className="gap-3">
        <CTAButton color="dark" fullWidth onClick={onNext}>
          다음
        </CTAButton>
        <HStack gap="none" justify="center">
          <Text typography="body-14-medium" textColor="gray-400">
            메일이 도착하지 않았나요?
          </Text>
          <Text
            typography="body-14-medium"
            textColor="gray-400"
            className="cursor-pointer underline"
            onClick={() => {}}
          >
            재전송
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
