'use client';

import { ROUTES } from '@/shared/constants';
import { ActionHeader } from '@/shared/ui';

export const LockerListHeader = () => {
  return (
    <ActionHeader>
      <ActionHeader.BackButton fallbackHref={ROUTES.HOME}>
        뒤로
      </ActionHeader.BackButton>
    </ActionHeader>
  );
};
