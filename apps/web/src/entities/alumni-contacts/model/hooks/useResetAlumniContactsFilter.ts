'use client';

import { useEffect, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ALUMNI_CONTACTS_FILTER } from '../../config';

export const useResetAlumniContactsFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const isLeavingAlumniContacts =
      prevPathname?.startsWith('/alumni-contacts') &&
      !pathname.startsWith('/alumni-contacts');

    if (isLeavingAlumniContacts) {
      const params = new URLSearchParams(searchParams.toString());
      Object.values(ALUMNI_CONTACTS_FILTER).forEach((filter) => {
        params.delete(filter);
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    prevPathnameRef.current = pathname;
  }, [pathname, router, searchParams]);
};
