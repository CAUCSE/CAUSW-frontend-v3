'use client';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { AuthError } from '@/shared/model';

import { ErrorView } from '@/shared';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (error instanceof AuthError) {
      return;
    }
    reportError(error);
  }, [error]);

  const handleReset = () => {
    queryClient.getQueryCache().clear();
    reset();
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ErrorView
        error={error}
        resetErrorBoundary={handleReset}
        errorMessage="페이지를 불러오는 중 문제가 발생했습니다."
      />
    </div>
  );
}
