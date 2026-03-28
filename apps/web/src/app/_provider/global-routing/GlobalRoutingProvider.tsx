'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useResetAlumniContactsFilter } from '@/entities/alumni-contacts';

import { toast, useAuthStore } from '@/shared/model';

export function GlobalRoutingProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const authError = useAuthStore((state) => state.authError);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);
  useResetAlumniContactsFilter();

  useEffect(() => {
    if (!authError) return;

    if (authError.errorType === 'token-expired') {
      toast.error(authError.message);

      // TODO: 로그인 시 callbackUrl 활용한 라우팅 추가
      const callbackUrl = encodeURIComponent(pathname ?? '/');
      router.push(`/auth/sign-in?callbackUrl=${callbackUrl}`);
    }

    clearAuthError();
  }, [authError, router, pathname, clearAuthError]);

  return <>{children}</>;
}
