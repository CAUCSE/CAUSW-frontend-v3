import { ReactElement } from 'react';

export type NavKey =
  | 'home'
  | 'community'
  | 'write'
  | 'directory'
  | 'profile'
  | 'about'
  | 'notifications'
  | 'setting';

export type NavItem = {
  key: NavKey;
  label: string;
  icon: ReactElement;
  badgeCount?: number;
  hasNotification?: boolean;
};

export type BottomNavItem = {
  key: Extract<NavKey, 'home' | 'community' | 'directory' | 'setting'>;
  label: string;
  icon: React.ReactNode;
};
