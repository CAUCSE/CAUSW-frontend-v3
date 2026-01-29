import { ReactElement } from 'react';

export type NavKey =
  | 'home'
  | 'community'
  | 'write'
  | 'directory'
  | 'profile'
  | 'about'
  | 'notifications';

export type NavItem = {
  key: NavKey;
  label: string;
  icon: ReactElement;
  /** 숫자 뱃지 */
  badgeCount?: number;
  /** 빨간 점(읽지 않은 알림 등) */
  hasDot?: boolean;
};
export type BottomNavItem = {
  key: Extract<NavKey, 'home' | 'community' | 'write' | 'directory'>;
  label: string;
  icon: React.ReactNode;
};
