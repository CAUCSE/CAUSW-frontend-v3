'use client';

import { VStack } from '@causw/cds';

import { SearchInput } from '@/features/search';

import { type BoardGroup } from '@/entities/feed';

import { ActionHeader } from '@/shared/ui';

interface SearchHeaderProps {
  boardGroup: BoardGroup;
  placeholder?: string;
}

export const SearchHeader = ({
  boardGroup,
  placeholder,
}: SearchHeaderProps) => {
  return (
    <VStack gap="none" className="z-sticky sticky top-0 gap-0.5 bg-white">
      <ActionHeader isSticky={false} className="px-5 py-4" background="white">
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>
      <SearchInput boardGroup={boardGroup} placeholder={placeholder} />
    </VStack>
  );
};
