import { Bell, Board, Book, Contacts, Home, Pen, Setting } from '@causw/cds';

import { ROUTES } from '@/shared/constants';

import { type BottomNavItem, type SidebarItem } from './types';

export const SIDEBAR_MAIN_ITEMS: SidebarItem[] = [
  { key: 'home', label: '홈', icon: <Home />, href: '/home' },
  {
    key: 'feed',
    label: '커뮤니티',
    icon: <Board size={18} />,
    href: `${ROUTES.FEED}`,
  },
  {
    key: 'write',
    label: '글쓰기',
    icon: <Pen size={18} />,
    href: `${ROUTES.REGISTER_FEED}`,
  },
  {
    key: 'alumni-contacts',
    label: '동문수첩',
    icon: <Contacts size={18} />,
    href: `${ROUTES.ALUMNI_CONTACTS}`,
  },
  {
    key: 'profile',
    label: '내 동문수첩',
    icon: <Book size={18} />,
    href: `${ROUTES.PROFILE}`,
  },
];

export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  // {
  //   key: 'info',
  //   label: '크자회 소개',
  //   icon: <Question size={18} />,
  //   href: '/info',
  // },
  {
    key: 'notifications',
    label: '알림',
    icon: <Bell size={18} />,
    href: `${ROUTES.NOTIFICATION}`,
  },
];

export const SIDEBAR_ITEMS = [...SIDEBAR_MAIN_ITEMS, ...SIDEBAR_BOTTOM_ITEMS];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: '홈', icon: <Home />, href: `${ROUTES.HOME}` },
  { key: 'feed', label: '커뮤니티', icon: <Board />, href: `${ROUTES.FEED}` },
  {
    key: 'alumni-contacts',
    label: '동문수첩',
    icon: <Contacts />,
    href: `${ROUTES.ALUMNI_CONTACTS}`,
  },
  {
    key: 'setting',
    label: '내 정보',
    icon: <Setting />,
    href: `${ROUTES.SETTING}`,
  },
];
