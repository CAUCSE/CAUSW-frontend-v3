'use client';

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { useAlumniContactsFilterStore } from '@/entities/alumni-contacts/model/stores';

export const useResetAlumniContactsFilter = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const resetAlumniContactsFilter = useAlumniContactsFilterStore(
    (state) => state.reset,
  );

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const isLeavingAlumniContacts =
      prevPathname?.startsWith('/alumni-contacts') &&
      !pathname.startsWith('/alumni-contacts');

    if (isLeavingAlumniContacts) {
      resetAlumniContactsFilter();
      useAlumniContactsFilterStore.persist.clearStorage();
    }

    prevPathnameRef.current = pathname;
  }, [pathname, resetAlumniContactsFilter]);
};
