'use client';

import { ChangeEvent, useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import { Search, TextInput } from '@causw/cds';

import { useAlumniContactsFilterStore } from '@/entities/alumni-contacts';

export const AlumniContactsSearchInput = () => {
  const { keyword, setKeyword } = useAlumniContactsFilterStore(
    useShallow((state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
    })),
  );

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    element?.focus();
  }, []);

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setKeyword(value);
    },
    [setKeyword],
  );

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
