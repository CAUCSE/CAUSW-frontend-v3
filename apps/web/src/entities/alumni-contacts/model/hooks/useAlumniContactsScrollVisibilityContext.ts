'use client';

import { useContext } from 'react';

import { AlumniContactsScrollVisibilityContext } from '../contexts';

export const useAlumniContactsScrollVisibilityContext = () => {
  const context = useContext(AlumniContactsScrollVisibilityContext);
  if (!context) {
    throw new Error(
      'useAlumniContactsScrollVisibilityContext must be used within a AlumniContactsScrollVisibilityProvider',
    );
  }
  return context;
};
