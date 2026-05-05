'use client';

import { useRouter } from 'next/navigation';

import { ActionHeader } from '@/shared/ui';

export const MyAlumniContactsEditButton = () => {
  const router = useRouter();

  const handleClickEditButton = () => {
    router.push(`/profile/edit`);
  };
  return (
    <ActionHeader.ActionButton onClick={handleClickEditButton}>
      수정하기
    </ActionHeader.ActionButton>
  );
};
