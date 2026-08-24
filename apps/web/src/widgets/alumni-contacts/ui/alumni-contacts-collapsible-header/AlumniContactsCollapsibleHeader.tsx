'use client';

import { type PropsWithChildren } from 'react';

import { mergeStyles } from '@causw/cds';

import { useScrollDirectionVisibility } from '@/shared/hooks';

import { ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME } from '../../config';

export const AlumniContactsCollapsibleHeader = ({
  children,
}: PropsWithChildren) => {
  const { isVisible } = useScrollDirectionVisibility({
    containerClassName: ALUMNI_CONTACTS_SCROLL_CONTAINER_CLASS_NAME,
  });

  return (
    <div
      className={mergeStyles(
        '-mx-2 grid shrink-0 overflow-hidden px-2 transition-[grid-template-rows] duration-200 ease-out',
        isVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div
        className={mergeStyles(
          'flex min-h-0 flex-col gap-3 py-1 transition-opacity duration-150 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {children}
      </div>
    </div>
  );
};
