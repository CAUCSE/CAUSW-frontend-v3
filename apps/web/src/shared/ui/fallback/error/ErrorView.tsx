'use client';

import { type FallbackProps } from 'react-error-boundary';

import { useRouter } from 'next/navigation';

import { Button, ErrorColored, HStack, Spacer, Text, VStack } from '@causw/cds';

import { TokenManager } from '@/shared/storage';

interface ErrorViewProps extends FallbackProps {
  errorMessage?: string;
  showGoHomeButton?: boolean;
}

export function ErrorView({
  errorMessage,
  resetErrorBoundary,
  showGoHomeButton = false,
}: ErrorViewProps) {
  const router = useRouter();
  const routeToHome = async () => {
    await Promise.all([
      TokenManager.removeAccessToken(),
      TokenManager.removeRefreshToken(),
    ]);
    resetErrorBoundary();
    router.push('/auth/sign-in');
  };
  return (
    <VStack
      align="center"
      justify="center"
      gap="none"
      className="h-full w-full p-5"
    >
      <ErrorColored size={40} />
      <Spacer size={4} />
      <Text typography="subtitle-20-bold">
        {errorMessage || '문제가 발생했어요'}
      </Text>
      <Spacer size={10} />
      <HStack gap="sm">
        <Button
          onClick={() => (resetErrorBoundary(), router.refresh())}
          color="red"
        >
          다시 시도
        </Button>
        {showGoHomeButton && (
          <Button onClick={routeToHome} color="gray">
            로그인 화면으로
          </Button>
        )}
      </HStack>
    </VStack>
  );
}
