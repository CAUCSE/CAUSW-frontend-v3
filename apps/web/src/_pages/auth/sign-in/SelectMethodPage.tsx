'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Text, VStack } from '@causw/cds';

import { MethodSelectContainer, SessionKeepConfirmModal } from '@/widgets/auth';

import {
  AppleLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '@/features/auth';

import { APPLE_SERVICE_ID, GOOGLE_CLIENT_ID } from '@/shared/config';
import { isAndroid } from '@/shared/utils';

type SocialProvider = 'kakao' | 'apple' | 'google';

export const SelectMethodPage = () => {
  const router = useRouter();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
    null,
  );
  const sessionKeepPreferenceRef = useRef<boolean | null>(null);

  const handleSocialButtonClick =
    (provider: SocialProvider): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      if (sessionKeepPreferenceRef.current !== null) return;

      event.preventDefault();
      setPendingProvider(provider);
      setConfirmModalOpen(true);
    };

  const handleConfirm = (shouldKeepSession: boolean) => {
    sessionKeepPreferenceRef.current = shouldKeepSession;
    setConfirmModalOpen(false);

    if (!pendingProvider) return;

    const selector = `button[data-social-provider="${pendingProvider}"]`;
    setPendingProvider(null);

    queueMicrotask(() => {
      const targetButton = document.querySelector<HTMLButtonElement>(selector);
      targetButton?.click();
    });
  };

  const handleConfirmModalOpenChange = (open: boolean) => {
    setConfirmModalOpen(open);
    if (!open && sessionKeepPreferenceRef.current === null) {
      setPendingProvider(null);
    }
  };

  return (
    <MethodSelectContainer>
      <SessionKeepConfirmModal
        open={confirmModalOpen}
        onOpenChange={handleConfirmModalOpenChange}
        onConfirm={handleConfirm}
      />
      <VStack className="gap-20">
        <VStack justify="center" align="center" className="w-full gap-8">
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
            data-social-provider="kakao"
            onClick={handleSocialButtonClick('kakao')}
            redirectUri="/auth/sign-in/kakao"
          />

          {!isAndroid && (
            <AppleLoginButton
              data-social-provider="apple"
              onClick={handleSocialButtonClick('apple')}
              serviceId={APPLE_SERVICE_ID}
              redirectUri={'/auth/sign-in/apple/callback'}
            />
          )}

          <GoogleLoginButton
            data-social-provider="google"
            onClick={handleSocialButtonClick('google')}
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
