'use client';

import { useRouter } from 'next/navigation';

import { ActionHeader } from '@/shared/ui';

export const NotificationListActionHeader = () => {
  const router = useRouter();

  const handleClickSetting = () => {
    router.push('/setting/notifications');
  };

  return (
    <ActionHeader>
      <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
      <ActionHeader.ActionButton onClick={handleClickSetting}>
        설정
      </ActionHeader.ActionButton>
    </ActionHeader>
  );
};
