'use client';

import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { shareAlumniContactsProfile } from '@/features/alumni-contacts';

import { toast } from '@/shared/model';
import { TokenManager } from '@/shared/storage';

export const useAlumniContactsHeroActions = (
  alumniContactsId: string,
  name: string,
) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isContactBottomSheetOpen, setIsContactBottomSheetOpen] =
    useState(false);

  const handleClickContact = () => {
    setIsContactBottomSheetOpen(true);
  };

  const handleClickEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleClickShare = async () => {
    const accessToken = await TokenManager.getAccessToken();

    if (!accessToken) {
      router.push(
        `/auth/sign-in?callbackUrl=${encodeURIComponent(pathname ?? '/home')}`,
      );
      return;
    }

    shareAlumniContactsProfile(alumniContactsId, name)
      .then((result) => {
        if (result === 'clipboard') toast.success('링크가 복사되었습니다.');
      })
      .catch(() => toast.error('공유에 실패했습니다.'));
  };

  return {
    isContactBottomSheetOpen,
    setIsContactBottomSheetOpen,
    handleClickContact,
    handleClickEditProfile,
    handleClickShare,
  };
};
