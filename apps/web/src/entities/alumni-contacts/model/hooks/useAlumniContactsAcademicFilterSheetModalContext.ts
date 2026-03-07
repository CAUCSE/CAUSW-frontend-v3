'use client';

import { useContext } from 'react';

import { AlumniContactsAcademicFilterSheetModalContext } from '../contexts';

export const useAlumniContactsAcademicFilterSheetModalContext = () => {
  const context = useContext(AlumniContactsAcademicFilterSheetModalContext);
  if (!context) {
    throw new Error(
      'useAlumniContactsAcademicFilterSheetModalContext must be used within a AlumniContactsAcademicFilterSheetModalProvider',
    );
  }
  return context;
};
