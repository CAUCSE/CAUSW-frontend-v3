import { Bell, Board, Contacts, Home, Setting } from '@causw/cds';

import { ROUTES } from '@/shared/constants';

import { type BottomNavItem, type SidebarItem } from './types';

export const SIDEBAR_MAIN_ITEMS: SidebarItem[] = [
  { key: 'home', label: '홈', icon: <Home />, href: ROUTES.HOME },
  { key: 'feed', label: '소식', icon: <Board />, href: ROUTES.FEED },
  {
    key: 'alumni-contacts',
    label: '동문수첩',
    icon: <Contacts />,
    href: ROUTES.ALUMNI_CONTACTS,
    activeHrefs: [ROUTES.COMMUNITY, ROUTES.PROFILE],
  },
  {
    key: 'setting',
    label: '내 정보',
    icon: <Setting />,
    href: ROUTES.SETTING,
  },
];

export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  {
    key: 'notifications',
    label: '알림',
    icon: <Bell />,
    href: ROUTES.NOTIFICATION,
  },
];

export const SIDEBAR_ITEMS = [...SIDEBAR_MAIN_ITEMS, ...SIDEBAR_BOTTOM_ITEMS];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: '홈', icon: <Home />, href: ROUTES.HOME },
  { key: 'feed', label: '소식', icon: <Board />, href: ROUTES.FEED },
  {
    key: 'alumni-contacts',
    label: '동문수첩',
    icon: <Contacts />,
    href: ROUTES.ALUMNI_CONTACTS,
    activeHrefs: [ROUTES.COMMUNITY],
  },
  {
    key: 'setting',
    label: '내 정보',
    icon: <Setting />,
    href: ROUTES.SETTING,
  },
];
