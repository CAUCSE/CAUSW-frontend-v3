'use client';

import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { debounce } from 'es-toolkit';

import { ALUMNI_CONTACTS_FILTER } from '@/entities/alumni-contacts';

import { canUseAutoFocus } from '@/shared/lib';

export const useAlumniContactsSearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState<string | null>(
    searchParams.get(ALUMNI_CONTACTS_FILTER.KEYWORD),
  );

  const handleInitialFocus = useCallback((element: HTMLInputElement | null) => {
    if (!canUseAutoFocus()) {
      return;
    }

    element?.focus();
  }, []);

  const debouncedSetKeywordParam = useMemo(
    () =>
      debounce((value: string, currentSearchParams: URLSearchParams) => {
        const params = new URLSearchParams(currentSearchParams.toString());
        const newValue = value.trim();
        if (newValue.length === 0) {
          params.delete(ALUMNI_CONTACTS_FILTER.KEYWORD);
        } else {
          params.set(ALUMNI_CONTACTS_FILTER.KEYWORD, newValue);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 300),
    [pathname, router],
  );

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setKeyword(value);
      debouncedSetKeywordParam(value, searchParams);
    },
    [debouncedSetKeywordParam, searchParams],
  );

  const handleClearKeyword = useCallback(() => {
    setKeyword('');
    debouncedSetKeywordParam('', searchParams);
  }, [debouncedSetKeywordParam, searchParams]);

  return {
    keyword,
    handleInitialFocus,
    handleTextInputChange,
    handleClearKeyword,
  };
};
