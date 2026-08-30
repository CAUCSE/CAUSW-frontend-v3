'use client';

import { VStack } from '@causw/cds';

import { FeedSearchInput } from '@/features/feed';

import { ActionHeader } from '@/shared/ui';

export const FeedSearchHeader = () => {
  return (
    <VStack gap="xs">
      <ActionHeader
        isSticky={false}
        className="px-5 md:px-0"
        background="white"
      >
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>
      <FeedSearchInput />
    </VStack>
  );
};
