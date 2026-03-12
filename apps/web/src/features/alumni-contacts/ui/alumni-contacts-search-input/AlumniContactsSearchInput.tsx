'use client';

import { Search, TextInput } from '@causw/cds';

import { useAlumniContactsSearchInput } from '@/features/alumni-contacts/model';

import { AlumniContactsSearchInputClearButton } from './AlumniContactsSearchInputClearButton';

export const AlumniContactsSearchInput = () => {
  const {
    keyword,
    handleInitialFocus,
    handleTextInputChange,
    handleClearKeyword,
  } = useAlumniContactsSearchInput();

  const isKeywordActive = keyword && keyword.length > 0;

  return (
    <TextInput
      leftIcon={<Search size={20} color="gray-400" />}
      rightIcon={
        isKeywordActive ? (
          <AlumniContactsSearchInputClearButton
            handleClearKeyword={handleClearKeyword}
          />
        ) : undefined
      }
      placeholder="이름, 직업, 경력으로 검색"
      ref={handleInitialFocus}
      className="placeholder:typo-body-16-regular text-gray-400 [&>span]:flex [&>span]:items-center"
      value={keyword ?? ''}
      onChange={handleTextInputChange}
    />
  );
};
