'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { NicknameChangeDialog, SettingOverview } from '@/widgets/setting';

export function SettingPage() {
  const router = useRouter();
  const [nicknameDialogOpen, setNicknameDialogOpen] = useState(false);

  const handleNavigate = (href: string) => {
    if (href === '/setting/nickname') {
      setNicknameDialogOpen(true);
      return;
    }
    router.push(href);
  };

  return (
    <>
      <SettingOverview onNavigate={handleNavigate} />
      <NicknameChangeDialog
        open={nicknameDialogOpen}
        onOpenChange={setNicknameDialogOpen}
      />
    </>
  );
}
