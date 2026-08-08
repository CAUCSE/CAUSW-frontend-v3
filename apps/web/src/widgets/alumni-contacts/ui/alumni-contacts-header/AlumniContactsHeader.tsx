'use client';

import { type ReactNode } from 'react';

import { ActionHeader } from '@/shared/ui';

interface AlumniContactsHeaderProps {
  action?: ReactNode;
  fallbackHref?: string;
}

export const AlumniContactsHeader = ({
  action,
  fallbackHref,
}: AlumniContactsHeaderProps) => {
  return (
    <ActionHeader background="white" className="backdrop-saturate-100">
      <ActionHeader.BackButton buttonColor="gray" fallbackHref={fallbackHref}>
        뒤로
      </ActionHeader.BackButton>
      {action && <>{action}</>}
    </ActionHeader>
  );
};
