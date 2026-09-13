'use client';

import { type PropsWithChildren } from 'react';

import { mergeStyles } from '@causw/cds';

import { POST_LIST_SCROLL_CONTAINER_CLASS_NAME } from '@/widgets/post-list';

import { useScrollDirectionVisibility } from '@/shared/hooks';

export const CommunityCollapsibleHeader = ({ children }: PropsWithChildren) => {
  const { isVisible: isToolbarVisible } = useScrollDirectionVisibility({
    containerClassName: POST_LIST_SCROLL_CONTAINER_CLASS_NAME,
  });

  return (
    <div
      className={mergeStyles(
        'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
        isToolbarVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div
        className={mergeStyles(
          'min-h-0 min-w-0 transition-opacity duration-150 ease-out',
          isToolbarVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {children}
      </div>
    </div>
  );
};
