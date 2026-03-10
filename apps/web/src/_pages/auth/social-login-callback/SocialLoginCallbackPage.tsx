'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Flex, Text } from '@causw/cds';

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

    const isFirstLogin = searchParams.get('isFirstLogin');
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    const isValidFirstLoginValue =
      isFirstLogin === 'true' || isFirstLogin === 'false';

    if (isFirstLogin) {
      router.replace('/auth/sign-up/oauth-additional-info');
      return;
    }

    if (error || !isValidFirstLoginValue) {
      toast.error(message ?? '잘못된 접근입니다.');
      router.replace('/auth/sign-in');
      return;
    }

    const handleCallback = async () => {
      try {
        const newAccessToken = await TokenManager.refreshAccessToken();
        await TokenManager.setAccessToken(newAccessToken);
        await TokenManager.setRefreshToken();

        if (isFirstLogin === 'true') {
          router.replace('/auth/enrollment-verification');
          return;
        }

        router.replace('/home');
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
