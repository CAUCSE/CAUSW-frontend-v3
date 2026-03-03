'use client';

import { useCallback } from 'react';

import { Search, TextInput } from '@causw/cds';

export const AlumniContactsSearchInput = () => {
  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  return (
    <TextInput
      leftIcon={<Search size={20} color="gray-400" />}
      placeholder="이름, 직업, 경력으로 검색"
      ref={handleInitialFocus}
      className="placeholder:typo-body-16-regular text-gray-400"
    />
  );
};
