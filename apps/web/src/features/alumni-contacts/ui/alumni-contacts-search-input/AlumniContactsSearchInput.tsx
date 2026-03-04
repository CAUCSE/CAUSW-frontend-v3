'use client';

import { Search, TextInput } from '@causw/cds';

import { useAlumniContactsSearchInput } from '@/features/alumni-contacts/model';

export const AlumniContactsSearchInput = () => {
  const { keyword, handleInitialFocus, handleTextInputChange } =
    useAlumniContactsSearchInput();

  return (
    <TextInput
      leftIcon={<Search size={20} color="gray-400" />}
      placeholder="이름, 직업, 경력으로 검색"
      ref={handleInitialFocus}
      className="placeholder:typo-body-16-regular text-gray-400"
      value={keyword ?? ''}
      onChange={handleTextInputChange}
    />
  );
};
