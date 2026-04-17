'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Flex, Text } from '@causw/cds';

import { routeAfterSignIn } from '@/features/auth';

import { toast } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
import { SuspenseView } from '@/shared/ui';

export const SocialLoginCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handledRef = useRef(false);

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
        const auth = await TokenManager.refreshAuth();
        await TokenManager.setAccessToken(auth.accessToken);
        await TokenManager.setRefreshToken();
        routeAfterSignIn(router, auth.onboardingStatus);
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
