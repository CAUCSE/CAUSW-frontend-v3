'use client';

import { ActionHeader } from '@/shared/ui';

export const MyFeedHeader = () => {
  return (
    <ActionHeader isSticky={false} className="shrink-0">
      <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
    </ActionHeader>
  );
};
