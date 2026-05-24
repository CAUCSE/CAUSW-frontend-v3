'use client';

import { type ReactNode } from 'react';

import { ActionHeader } from '@/shared/ui';

interface AlumniContactsHeaderProps {
  action?: ReactNode;
}

export const AlumniContactsHeader = ({ action }: AlumniContactsHeaderProps) => {
  return (
    <ActionHeader className="bg-[#4C688F] px-5 backdrop-saturate-100 md:px-6">
      <ActionHeader.BackButton className="[&_span]:text-white [&_span]:group-hover:text-gray-300! [&_svg]:fill-white [&_svg]:group-hover:fill-gray-300!">
        뒤로
      </ActionHeader.BackButton>
      {action && (
        <div className="[&_button]:text-white! [&_button:hover]:text-gray-300!">
          {action}
        </div>
      )}
    </ActionHeader>
  );
};
