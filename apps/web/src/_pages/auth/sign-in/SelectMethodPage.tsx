'use client';

import { useState } from 'react';
import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/navigation';

import { VStack } from '@causw/cds';

import {
  MethodSelectContainer,
  SessionKeepConfirmModal,
  SignInButtonsSkeleton,
  SignInHero,
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
import {
  selectMixpanelAuthMethod,
  useTrackMixpanelView,
} from '@/shared/lib/analytics';
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
  useTrackMixpanelView('auth_method_viewed');

  const handleSocialLogin =
    (
      provider: NativeSocialLoginProvider,
    ): MouseEventHandler<HTMLButtonElement> =>
    () => {
      selectMixpanelAuthMethod(provider);

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
        <VStack className="gap-8">
          <SignInHero />
          {isMounted ? (
            <VStack className="min-h-63 w-full gap-2 px-4">
              <>
                <KakaoLoginButton onClick={handleSocialLogin('kakao')} />
                {!isAndroid && (
                  <AppleLoginButton onClick={handleSocialLogin('apple')} />
                )}
                <GoogleLoginButton onClick={handleSocialLogin('google')} />
                <EmailLoginButton
                  onClick={() => {
                    selectMixpanelAuthMethod('email');
                    router.push('/auth/sign-in/email');
                  }}
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
