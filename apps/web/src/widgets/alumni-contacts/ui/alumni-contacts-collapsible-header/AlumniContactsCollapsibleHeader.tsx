'use client';

import { type PropsWithChildren } from 'react';

import { mergeStyles } from '@causw/cds';

import { useAlumniContactsScrollVisibilityContext } from '@/entities/alumni-contacts';

export const AlumniContactsCollapsibleHeader = ({
  children,
}: PropsWithChildren) => {
  const { isSearchFilterVisible } = useAlumniContactsScrollVisibilityContext();

  return (
    <div
      className={mergeStyles(
        '-mx-2 grid shrink-0 overflow-hidden px-2 transition-[grid-template-rows] duration-200 ease-out',
        isSearchFilterVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div
        className={mergeStyles(
          'flex min-h-0 flex-col gap-3 py-1 transition-opacity duration-150 ease-out',
          isSearchFilterVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {children}
      </div>
    </div>
  );
};
