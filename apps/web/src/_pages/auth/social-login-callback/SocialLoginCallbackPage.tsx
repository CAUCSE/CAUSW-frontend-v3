'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Flex, Text } from '@causw/cds';

import { routeAfterSignIn } from '@/features/auth';
import { usePushNotification } from '@/features/notification';

import { toast } from '@/shared/model';
import { AuthOptionManager, TokenManager } from '@/shared/storage';
import { SuspenseView } from '@/shared/ui';
import { isMobile } from '@/shared/utils';

export const SocialLoginCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handledRef = useRef(false);
  const { compareFCMToken } = usePushNotification();

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      toast.error(message ?? '잘못된 접근입니다.');
      router.replace('/auth/sign-in');
      return;
    }

    const handleCallback = async () => {
      try {
        const refreshToken = searchParams.get('refreshToken');

        if (!refreshToken) {
          throw new Error('No RefreshToken');
        }

        const {
          accessToken,
          refreshToken: newRefreshToken,
          onboardingStatus,
        } = await TokenManager.refreshAuth(refreshToken);
        if (isMobile) {
          await AuthOptionManager.setSessionPersist(true);
        }
        await TokenManager.setAccessToken(accessToken);
        await TokenManager.setRefreshToken(newRefreshToken);
        await compareFCMToken();
        routeAfterSignIn(router, onboardingStatus);
      } catch {
        toast.error('잘못된 인증 정보입니다.');
        router.replace('/auth/sign-in');
      }
    };

    void handleCallback();
  }, [router, searchParams]);

  return (
    <Flex
      justify="center"
      align="center"
      className="h-screen w-full bg-gray-100"
    >
      <Text typography="subtitle-20-bold">
        유저의 인증 상태를 확인 중입니다.
        <SuspenseView />
      </Text>
    </Flex>
  );
};
