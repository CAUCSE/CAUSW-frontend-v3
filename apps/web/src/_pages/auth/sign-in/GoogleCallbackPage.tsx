'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

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
        <svg width="32" height="32" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.6 0 6.1 1.6 7.5 2.9l5.1-5.1C33.3 4.1 29 2.4 24 2.4 15.2 2.4 7.7 7.4 4.1 14.7l6.2 4.8C12 13.6 17.6 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.1 24.6c0-1.6-.1-2.7-.4-3.9H24v7.5h12.7c-.3 2-1.7 5-4.9 7.1l6 4.6c3.5-3.2 4.3-7.9 4.3-13.3z"
          />
          <path
            fill="#34A853"
            d="M10.3 28.1c-0.5-1.4-0.8-2.8-0.8-4.6s.3-3.2.8-4.6l-6.2-4.8C2.6 17 1.8 20 1.8 23.5c0 3.5.8 6.5 2.3 9.4l6.2-4.8z"
          />
          <path
            fill="#FBBC05"
            d="M24 44.6c6.5 0 12-2.1 16-5.7l-6-4.6c-1.6 1.1-3.9 2-7.9 2-6.4 0-11.9-4.1-13.7-9.8l-6.3 4.9C9.6 39.5 16.9 44.6 24 44.6z"
          />
        </svg>
      </div>
      <p className="typo-body-14-medium text-gray-400">잠시만 기다려 주세요</p>
    </div>
  );
};
