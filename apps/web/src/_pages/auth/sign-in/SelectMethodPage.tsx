'use client';

import { useState } from 'react';
import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import {
  MethodSelectContainer,
  SessionKeepConfirmModal,
  SignInButtonsSkeleton,
  SignInImageSection,
} from '@/widgets/auth';

import {
  AppleLoginButton,
  EmailLoginButton,
  getSocialOauthUrl,
  GoogleLoginButton,
  KakaoLoginButton,
  useNativeSocialLoginFlowMutation,
  useRestoreMobileAuth,
} from '@/features/auth';

import type { NativeSocialLoginProvider } from '@/entities/auth';

import { useIsMounted } from '@/shared/hooks';
import { AuthOptionManager } from '@/shared/storage';
import { QueryClientClearProvider } from '@/shared/ui';
import { isAndroid, isMobile } from '@/shared/utils';

type DesktopSocialProvider = 'kakao' | 'apple' | 'google';

export const SelectMethodPage = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const nativeSocialLoginFlowMutation = useNativeSocialLoginFlowMutation();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingProvider, setPendingProvider] =
    useState<DesktopSocialProvider | null>(null);
  useRestoreMobileAuth();

  const handleSocialLogin =
    (provider: NativeSocialLoginProvider): MouseEventHandler<HTMLButtonElement> =>
    () => {
      if (isMobile) {
        nativeSocialLoginFlowMutation.mutate({ provider });
        return;
      }

      setPendingProvider(provider);
      setConfirmModalOpen(true);
    };

  const handleConfirmSessionPersist = async (persist: boolean) => {
    if (!pendingProvider) {
      return;
    }

    await AuthOptionManager.setSessionPersist(persist);
    window.location.href = getSocialOauthUrl(pendingProvider);
  };

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
                <KakaoLoginButton onClick={handleSocialLogin('kakao')} />

                {!isAndroid && (
                  <AppleLoginButton onClick={handleSocialLogin('apple')} />
                )}

                <GoogleLoginButton onClick={handleSocialLogin('google')} />

                <EmailLoginButton
                  onClick={() => router.push('/auth/sign-in/email')}
                />
              </>
            </VStack>
          ) : (
            <SignInButtonsSkeleton />
          )}
        </VStack>
        <SessionKeepConfirmModal
          open={confirmModalOpen}
          onOpenChange={setConfirmModalOpen}
          onConfirm={(value) => {
            void handleConfirmSessionPersist(value);
          }}
        />
      </MethodSelectContainer>
    </QueryClientClearProvider>
  );
};
