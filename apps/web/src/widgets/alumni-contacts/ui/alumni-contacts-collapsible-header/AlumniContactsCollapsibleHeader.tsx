'use client';

import { type PropsWithChildren } from 'react';

import { useAlumniContactsScrollVisibilityContext } from '@/entities/alumni-contacts';

export const AlumniContactsCollapsibleHeader = ({
  children,
}: PropsWithChildren) => {
  const { isSearchFilterVisible } = useAlumniContactsScrollVisibilityContext();

  return (
    <div
      className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out ${
        isSearchFilterVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div
        className={`flex min-h-0 flex-col gap-3 p-1 transition-opacity duration-150 ease-out ${
          isSearchFilterVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
