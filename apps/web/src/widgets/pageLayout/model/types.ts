import { ReactElement } from 'react';

export type SidebarKey =
  | 'home'
  | 'board'
  | 'write'
  | 'alumni-contacts'
  | 'profile'
  | 'info'
  | 'notifications';

export type SidebarItem = {
  key: SidebarKey;
  label: string;
  icon: ReactElement;
  href: string;
  badgeCount?: number;
  hasNotification?: boolean;
};

export type BottomNavKey = 'home' | 'board' | 'alumni-contacts' | 'setting';

export type BottomNavItem = {
  key: BottomNavKey;
  label: string;
  icon: ReactElement;
  href: string;
};
