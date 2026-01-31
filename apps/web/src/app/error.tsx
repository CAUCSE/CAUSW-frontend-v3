'use client';

import { useEffect } from 'react';

import { ErrorView } from '@/shared/ui';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ErrorView
        error={error}
        resetErrorBoundary={reset}
        errorMessage="페이지를 불러오는 중 문제가 발생했습니다."
      />
    </div>
  );
}
