'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { CLEAR_QUERY_PARAM, CLEAR_QUERY_PARAM_VALUE } from '@/shared/constants';

export const ClearQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldClearQuery =
    searchParams.get(CLEAR_QUERY_PARAM) === CLEAR_QUERY_PARAM_VALUE;

  useEffect(() => {
    if (!shouldClearQuery) return;

    queryClient.clear();

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete(CLEAR_QUERY_PARAM);

    const nextSearch = nextSearchParams.toString();
    router.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname);
  }, [pathname, queryClient, router, searchParams, shouldClearQuery]);

  return <>{children}</>;
};
