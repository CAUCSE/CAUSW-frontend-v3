'use client';

import { useRouter } from 'next/navigation';

import { Dialog, HStack, Text, VStack } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks';

export const PostCreateModal = () => {
  const router = useRouter();

  const { isMobileSize } = useBreakpoint();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <Dialog.Content
        fullscreen={isMobileSize}
        width={isMobileSize ? undefined : 700}
      >
        <VStack gap="lg" className="h-full">
          <HStack justify="between" align="center">
            <Dialog.Title>
              <Text typography="title-48-bold">글쓰기</Text>
            </Dialog.Title>
          </HStack>
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
