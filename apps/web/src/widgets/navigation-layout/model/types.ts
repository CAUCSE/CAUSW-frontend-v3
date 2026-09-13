import { type ReactElement } from 'react';

export type SidebarKey =
  | 'home'
  | 'feed'
  | 'alumni-contacts'
  | 'setting'
  | 'notifications';

export type BottomNavKey = 'home' | 'feed' | 'alumni-contacts' | 'setting';

interface NavItemBase {
  label: string;
  icon: ReactElement;
  href: string;
  /** href 외에 이 항목을 활성 상태로 표시할 추가 경로 (예: 동문수첩의 소통 탭, 내 동문수첩) */
  activeHrefs?: string[];
}

export interface SidebarItem extends NavItemBase {
  key: SidebarKey;
}

export interface BottomNavItem extends NavItemBase {
  key: BottomNavKey;
}
