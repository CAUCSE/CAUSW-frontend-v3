'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { GoogleLogo } from '@causw/cds';

import { useOAuthCallback } from '@/features/auth';
import { useGoogleLoginMutation } from '@/features/auth/model/mutations';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

export const GoogleCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutateAsync: loginWithGoogleCode } = useGoogleLoginMutation({
    onError: () => {},
  });

  const code = searchParams.get('code');
  useEffect(() => {
    if (!code) {
      router.replace('/auth/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOAuthCallback({
    onSuccess: async (googleCode) => {
      const toastId = String(toast.loading('Google 로그인 중...'));
      try {
        await loginWithGoogleCode({ code: googleCode });
        toast.dismiss(toastId);
        toast.success('로그인되었습니다.');
        router.replace('/home');
      } catch (err) {
        toast.dismiss(toastId);
        toast.error(
          extractErrorMessage(
            err,
            'Google 로그인에 실패했습니다. 다시 시도해 주세요.',
          ),
        );
        router.replace('/auth/sign-in');
      }
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(
          err,
          'Google 로그인에 실패했습니다. 다시 시도해 주세요.',
        ),
      );
      router.replace('/auth/sign-in');
    },
    removeCodeFromUrl: true,
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] border border-gray-200 bg-white shadow-md">
        <GoogleLogo size={32} />
      </div>
      <p className="typo-body-14-medium text-gray-400">잠시만 기다려 주세요</p>
    </div>
  );
};
