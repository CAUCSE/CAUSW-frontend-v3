'use client';

import { useRouter } from 'next/navigation';

import { Text, CTAButton, VStack } from '@causw/cds';

import { MethodSelectContainer } from '@/widgets/auth';

import { KakaoLoginButton, AppleLoginButton } from '@/features/auth';

export const SelectMethodPage = () => {
  const router = useRouter();

  return (
    <MethodSelectContainer>
      <VStack className="gap-20">
        <VStack justify="center" align="center" className="w-full gap-8">
          {/* Logo placeholder */}
          <VStack
            justify="center"
            align="center"
            className="h-[130px] w-[130px] rounded-[40px] bg-gray-300"
          >
            <Text typography="title-22-bold" textColor="gray-400">
              LOGO
            </Text>
          </VStack>

          <Text
            as="h1"
            typography="title-22-bold"
            textColor="gray-800"
            className="text-center whitespace-pre-wrap"
          >
            함께하면 더 밝은 미래로,{'\n'}
            우리들의 동문네트워크
          </Text>
        </VStack>

        <VStack className="w-full gap-3">
          <KakaoLoginButton
            onClick={() => console.log('Kakao login')}
            redirectUri="/auth/sign-in/kakao"
          />

          <AppleLoginButton onClick={() => console.log('Apple login')} />

          <CTAButton
            color="white"
            fullWidth
            onClick={() => router.push('/auth/sign-in/email')}
          >
            이메일로 시작하기
          </CTAButton>
        </VStack>
      </VStack>
    </MethodSelectContainer>
  );
};
