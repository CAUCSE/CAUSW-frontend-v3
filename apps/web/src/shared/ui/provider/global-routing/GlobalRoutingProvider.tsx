'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { toast } from '@causw/cds';

import { useAuthStore } from '@/shared/model';

type ProviderProps = {
  children: ReactNode;
};

export function GlobalRoutingProvider({ children }: ProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const authError = useAuthStore((state) => state.authError);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);

  useEffect(() => {
    if (!authError) return;

    if (authError.code === 'token-expired') {
      toast.error(authError.message);

      // TODO: 로그인 시 callbackUrl 활용한 라우팅 추가
      const callbackUrl = encodeURIComponent(pathname ?? '/');
      router.push(`/auth/sign-in?callbackUrl=${callbackUrl}`);
    }

    clearAuthError();
  }, [authError, router, pathname, clearAuthError]);

  return <>{children}</>;
}
