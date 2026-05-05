'use client';

import { useEffect, type PropsWithChildren } from 'react';

import { useQueryClient } from '@tanstack/react-query';

export const QueryClientClearProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();
  }, [queryClient]);

  return <>{children}</>;
};
