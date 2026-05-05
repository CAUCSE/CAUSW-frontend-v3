'use client';

import { LockerPageWidget } from '@/widgets/locker';

import { ActionHeader } from '@/shared/ui';

export const LockerListPage = () => {
  return (
    <div className="min-h-full bg-gray-100">
      <ActionHeader
        background="gray"
        className="tablet:mx-auto tablet:max-w-[900px] tablet:px-8"
      >
        <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      </ActionHeader>
      <LockerPageWidget />
    </div>
  );
};
