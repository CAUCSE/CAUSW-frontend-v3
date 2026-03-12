'use client';

import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  ALUMNI_CONTACTS_FILTER,
  AlumniContactsSortFilterOption,
} from '@/entities/alumni-contacts';

export const useAlumniContactsSortFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortType = useMemo(() => {
    return searchParams.get(
      ALUMNI_CONTACTS_FILTER.SORT_TYPE,
    ) as AlumniContactsSortFilterOption | null;
  }, [searchParams]);

  const setSortTypeParam = useCallback(
    (value: AlumniContactsSortFilterOption) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(ALUMNI_CONTACTS_FILTER.SORT_TYPE, value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setSortTypeParam(value as AlumniContactsSortFilterOption);
    },
    [setSortTypeParam],
  );

  return {
    sortType,
    handleSelectChange,
  };
};
