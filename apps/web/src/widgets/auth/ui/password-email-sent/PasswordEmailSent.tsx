'use client';

import { useRouter } from 'next/navigation';

import { VStack, Text, CTAButton } from '@causw/cds';

interface PasswordEmailSentProps {
  email: string;
}

export const PasswordEmailSent = ({ email }: PasswordEmailSentProps) => {
  const router = useRouter();

  return (
    <VStack className="w-full gap-10">
      <VStack className="gap-2 px-1">
        <Text as="h1" typography="title-22-bold" textColor="gray-800">
          이메일 전송 완료
        </Text>
        <Text typography="body-16-medium" textColor="gray-600">
          {email}로 비밀번호 재설정에 대한 안내가 포함된 이메일이
          전송되었습니다. 이메일이 도착하지 않으면 스팸 폴더를 확인하세요.
        </Text>
      </VStack>

      <CTAButton
        color="dark"
        fullWidth
        onClick={() => router.push('/auth/sign-in')}
      >
        로그인 화면으로 돌아가기
      </CTAButton>
    </VStack>
  );
};
