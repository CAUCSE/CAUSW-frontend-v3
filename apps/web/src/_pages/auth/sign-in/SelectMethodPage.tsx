'use client';

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import {
  MethodSelectContainer,
  SignInButtonsSkeleton,
  SignInImageSection,
} from '@/widgets/auth';

import {
  AppleLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
  useRestoreMobileAuth,
} from '@/features/auth';

import { useIsMounted } from '@/shared/hooks';
import { QueryClientClearProvider } from '@/shared/ui';
import { isAndroid } from '@/shared/utils';

export const SelectMethodPage = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  useRestoreMobileAuth();

  return (
    <QueryClientClearProvider>
      <MethodSelectContainer>
        <VStack className="gap-12 md:gap-20">
          <VStack justify="center" align="center" className="w-full gap-8">
            <SignInImageSection />

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

          {isMounted ? (
            <VStack className="min-h-[252px] w-full gap-3">
              <>
                <KakaoLoginButton />

                {!isAndroid && <AppleLoginButton />}

                <GoogleLoginButton />

                <EmailLoginButton
                  onClick={() => router.push('/auth/sign-in/email')}
                />
              </>
            </VStack>
          ) : (
            <SignInButtonsSkeleton />
          )}
        </VStack>
      </MethodSelectContainer>
    </QueryClientClearProvider>
  );
};
