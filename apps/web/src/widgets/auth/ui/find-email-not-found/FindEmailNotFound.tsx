'use client';

import { useRouter } from 'next/navigation';

import { Text, VStack, HStack, CTAButton, LockOpenColored } from '@causw/cds';

interface FindEmailNotFoundProps {
  onRetry: () => void;
}

export const FindEmailNotFound = ({ onRetry }: FindEmailNotFoundProps) => {
  const router = useRouter();

  return (
    <VStack className="w-full gap-10">
      <VStack className="w-full gap-4">
        <Text
          as="h1"
          typography="title-22-bold"
          textColor="gray-800"
          className="px-1"
        >
          이메일 찾기 결과
        </Text>

        <VStack className="gap-4 rounded-[1rem] bg-white p-5">
          <LockOpenColored size={44} />
          <VStack className="gap-2">
            <Text typography="subtitle-16-bold" textColor="gray-700">
              가입된 계정 정보를 찾을 수 없어요.
            </Text>
            <Text typography="body-15-regular" textColor="gray-500">
              입력하신 정보(이름, 이메일)에 오타가 없는지 다시 한번 확인해
              주세요.
            </Text>
          </VStack>
        </VStack>
      </VStack>

      <HStack className="w-full gap-2">
        <CTAButton color="white" className="flex-1" onClick={onRetry}>
          다시 입력하기
        </CTAButton>
        <CTAButton
          color="dark"
          className="flex-1"
          onClick={() => router.push('/auth/sign-up')}
        >
          회원가입
        </CTAButton>
      </HStack>
    </VStack>
  );
};
