import type { ActivityType } from '@/entities/setting';

export type SettingActivityItem = {
  id: ActivityType;
  label: string;
  href: string;
};

export type SettingAccountMenuItem = {
  id: 'notifications' | 'nickname' | 'privacy' | 'password';
  label: string;
  href: string;
};

export type SettingSupportMenuItem = {
  id: 'notices' | 'report' | 'terms';
  label: string;
  href: string;
};
