'use client';

import { useRouter } from 'next/navigation';

import { ProfileEditButton } from '@/features/setting';

export const SettingProfileEditButton = () => {
  const router = useRouter();

  return <ProfileEditButton onNavigate={(href) => router.push(href)} />;
};
