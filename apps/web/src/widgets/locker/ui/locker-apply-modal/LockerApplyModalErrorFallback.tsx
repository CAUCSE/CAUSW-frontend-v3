'use client';

import { type FallbackProps } from 'react-error-boundary';

import { useRouter } from 'next/navigation';

import { isApiError } from '@causw/api-client';
import { Button, Dialog, ErrorColored, HStack, Text, VStack } from '@causw/cds';

import { resetAuthAndRouteToSignIn } from '@/features/auth';

import { useBreakpoint } from '@/shared/hooks';

import { lockerApplyModalDefaultCss } from '../../config';

const INVALID_LOCKER_LOCATION_ID_ERROR_CODE = 'LOCKER_404_001';

export const LockerApplyModalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const router = useRouter();

  const { isMobileSize } = useBreakpoint();

  const isInvalidLockerLocationId =
    isApiError(error) &&
    error.data?.code === INVALID_LOCKER_LOCATION_ID_ERROR_CODE;

  const errorMessage = isInvalidLockerLocationId
    ? '존재하지 않거나 사용할 수 없는 사물함 위치입니다.'
    : '사물함 정보를 불러오는 중 문제가 발생했어요.';

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      router.replace('/locker');
    }
  };

  const handleRetry = () => {
    resetErrorBoundary();
    router.refresh();
  };

  const handleGoToSignIn = async () => {
    await resetAuthAndRouteToSignIn(router);
  };

  return (
    <Dialog open onOpenChange={handleCloseModal}>
      <Dialog.Content
        fullscreen={isMobileSize}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          handleCloseModal(false);
        }}
        className={lockerApplyModalDefaultCss(isMobileSize)}
      >
        <Dialog.Title className="sr-only">
          사물함 조회 오류가 발생했어요
        </Dialog.Title>
        <Dialog.Description className="sr-only">
          {errorMessage}
        </Dialog.Description>
        <VStack align="center" justify="center" gap="lg" className="size-full">
          <ErrorColored size={40} />
          <Text
            typography="subtitle-20-bold"
            textColor="gray-800"
            className="hidden md:block"
          >
            {errorMessage}
          </Text>
          <Text
            typography="subtitle-18-bold"
            textColor="gray-800"
            className="block md:hidden"
          >
            {errorMessage}
          </Text>
          <HStack justify="between" align="center" gap="xl" className="h-13">
            {isInvalidLockerLocationId ? (
              <Dialog.Close asChild>
                <Button color="red" className="h-full flex-1">
                  <Text typography="body-15-semibold" textColor="red-400">
                    사물함 목록으로
                  </Text>
                </Button>
              </Dialog.Close>
            ) : (
              <>
                <Button
                  onClick={handleRetry}
                  color="red"
                  className="h-full flex-1"
                >
                  <Text typography="body-15-semibold" textColor="red-400">
                    다시 시도
                  </Text>
                </Button>
                <Button
                  onClick={handleGoToSignIn}
                  color="gray"
                  className="h-full flex-1"
                >
                  <Text typography="body-15-semibold" textColor="gray-500">
                    로그인 화면으로
                  </Text>
                </Button>
              </>
            )}
          </HStack>
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
