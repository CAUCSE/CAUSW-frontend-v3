'use client';

import { VStack } from '@causw/cds';

import { FeedSearchInput } from '@/features/feed';

import { ActionHeader } from '@/shared/ui';

export const FeedSearchHeader = () => {
  return (
    <VStack gap="xs">
      <ActionHeader isSticky={false} className="px-5 md:px-0">
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>
      <FeedSearchInput />
    </VStack>
  );
};
