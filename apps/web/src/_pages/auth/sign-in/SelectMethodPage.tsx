'use client';

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import { MethodSelectContainer } from '@/widgets/auth';

import {
  AppleLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '@/features/auth';

import { APPLE_SERVICE_ID, GOOGLE_CLIENT_ID } from '@/shared/storage';
import { isAndroid } from '@/shared/utils';

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

          {!isAndroid && (
            <AppleLoginButton
              onClick={() => console.log('Apple login')}
              serviceId={APPLE_SERVICE_ID}
              redirectUri={'/auth/sign-in/apple/callback'}
            />
          )}

          <GoogleLoginButton
            onClick={() => console.log('Google login')}
            clientId={GOOGLE_CLIENT_ID}
            redirectUri={'/auth/sign-in/google'}
          />

          <EmailLoginButton
            onClick={() => router.push('/auth/sign-in/email')}
          />
        </VStack>
      </VStack>
    </MethodSelectContainer>
  );
};
