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
        '-mx-2 grid overflow-hidden px-2 transition-[grid-template-rows,max-height] duration-200 ease-out will-change-[grid-template-rows]',
        isSearchFilterVisible ? 'grid-rows-[1fr]' : 'max-h-0 grid-rows-[0fr]',
      )}
    >
      <div className="flex min-h-0 flex-col gap-3 py-1">{children}</div>
    </div>
  );
};
