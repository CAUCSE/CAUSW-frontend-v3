'use client';

import { createContext } from 'react';

interface AlumniContactsScrollVisibilityContextProps {
  isSearchFilterVisible: boolean;
  setIsSearchFilterVisible: (isSearchFilterVisible: boolean) => void;
}

export const AlumniContactsScrollVisibilityContext =
  createContext<AlumniContactsScrollVisibilityContextProps>({
    isSearchFilterVisible: true,
    setIsSearchFilterVisible: () => {},
  });
