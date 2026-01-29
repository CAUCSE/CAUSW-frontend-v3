import { ReactElement } from 'react';
<<<<<<< HEAD
//TODO: write 라우팅 주소 수정 필요
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
=======

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
>>>>>>> 5392a88 (feat: add sidebar)
};
