'use client';

import { useRouter } from 'next/navigation';

import { SettingOverview } from '@/widgets/setting';

export function SettingPage() {
  const router = useRouter();

  return <SettingOverview onNavigate={(href) => router.push(href)} />;
}
