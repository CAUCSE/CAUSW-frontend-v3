'use client';

import { type ChangeEvent, useCallback } from 'react';

import { useShallow } from 'zustand/shallow';

import { useAlumniContactsFilterStore } from '@/entities/alumni-contacts';

export const useAlumniContactsSearchInput = () => {
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

  return {
    keyword,
    handleInitialFocus,
    handleTextInputChange,
  };
};
