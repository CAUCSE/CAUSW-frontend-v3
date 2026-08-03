'use client';

import { type PropsWithChildren, useMemo, useState } from 'react';

import { AlumniContactsScrollVisibilityContext } from '@/entities/alumni-contacts/model';

export const AlumniContactsScrollVisibilityProvider = ({
  children,
}: PropsWithChildren) => {
  const [isSearchFilterVisible, setIsSearchFilterVisible] = useState(true);

  const value = useMemo(
    () => ({ isSearchFilterVisible, setIsSearchFilterVisible }),
    [isSearchFilterVisible],
  );

  return (
    <AlumniContactsScrollVisibilityContext.Provider value={value}>
      {children}
    </AlumniContactsScrollVisibilityContext.Provider>
  );
};
