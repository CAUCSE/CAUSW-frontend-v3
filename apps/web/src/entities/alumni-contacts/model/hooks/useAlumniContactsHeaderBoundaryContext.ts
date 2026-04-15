'use client';

import { useContext } from 'react';

import { AlumniContactsHeaderBoundaryContext } from '../contexts';

export const useAlumniContactsHeaderBoundaryContext = () => {
  const context = useContext(AlumniContactsHeaderBoundaryContext);
  if (!context) {
    throw new Error(
      'useAlumniContactsHeaderBoundaryContext must be used within a AlumniContactsHeaderBoundaryContext',
    );
  }
  return context;
};
