'use client';

import { type ReactNode } from 'react';

import { mergeStyles } from '@causw/cds';

import { ActionHeader } from '@/shared/ui';

import { useAlumniContactsDetailHeaderTheme } from '../../model';

interface AlumniContactsHeaderProps {
  action?: ReactNode;
}

export const AlumniContactsHeader = ({ action }: AlumniContactsHeaderProps) => {
  const { changeHeaderTextColor } = useAlumniContactsDetailHeaderTheme();

  return (
    <ActionHeader className="bg-transparent px-5 backdrop-saturate-100 md:px-6">
      <ActionHeader.BackButton
        className={mergeStyles(
          changeHeaderTextColor
            ? '[&_span]:text-gray-700 [&_span]:group-hover:text-gray-900! [&_svg]:fill-gray-700 [&_svg]:group-hover:fill-gray-900!'
            : '[&_span]:text-white [&_span]:group-hover:text-gray-300! [&_svg]:fill-white [&_svg]:group-hover:fill-gray-300!',
        )}
      >
        뒤로
      </ActionHeader.BackButton>
      {action && (
        <div
          className={mergeStyles(
            changeHeaderTextColor
              ? '[&_button]:text-gray-700! [&_button:hover]:text-gray-900!'
              : '[&_button]:text-white! [&_button:hover]:text-gray-300!',
          )}
        >
          {action}
        </div>
      )}
    </ActionHeader>
  );
};
