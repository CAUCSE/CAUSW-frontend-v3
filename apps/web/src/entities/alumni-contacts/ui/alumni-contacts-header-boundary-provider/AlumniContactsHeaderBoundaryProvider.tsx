'use client';

import { useRef, type PropsWithChildren } from 'react';

import { AlumniContactsHeaderBoundaryContext } from '../../model';

export const AlumniContactsHeaderBoundaryProvider = ({
  children,
}: PropsWithChildren) => {
  const alumniContactsHeroRef = useRef<HTMLDivElement>(null);
  return (
    <AlumniContactsHeaderBoundaryContext.Provider
      value={{ alumniContactsHeroRef }}
    >
      {children}
    </AlumniContactsHeaderBoundaryContext.Provider>
  );
};
