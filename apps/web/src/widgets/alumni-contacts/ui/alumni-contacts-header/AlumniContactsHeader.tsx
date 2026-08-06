'use client';

import { type ReactNode } from 'react';

import { ActionHeader } from '@/shared/ui';

interface AlumniContactsHeaderProps {
  action?: ReactNode;
}

export const AlumniContactsHeader = ({ action }: AlumniContactsHeaderProps) => {
  return (
    <ActionHeader background="white" className="backdrop-saturate-100">
      <ActionHeader.BackButton buttonColor="gray">뒤로</ActionHeader.BackButton>
      {action && <>{action}</>}
    </ActionHeader>
  );
};
