import {
  Bell,
  Board,
  Book,
  Contacts,
  Home,
  Pen,
  Question,
  Setting,
} from '@causw/cds';

import { type BottomNavItem, type SidebarItem } from './types';

export const SIDEBAR_MAIN_ITEMS: SidebarItem[] = [
  { key: 'home', label: '홈', icon: <Home />, href: '/home' },
  {
    key: 'feed',
    label: '커뮤니티',
    icon: <Board size={18} />,
    href: '/feed',
  },
  {
    key: 'write',
    label: '글쓰기',
    icon: <Pen size={18} />,
    href: '/feed/write',
  },
  {
    key: 'alumni-contacts',
    label: '동문수첩',
    icon: <Contacts size={18} />,
    href: '/alumni-contacts',
  },
  {
    key: 'profile',
    label: '내 동문수첩',
    icon: <Book size={18} />,
    href: '/profile',
  },
];

export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  {
    key: 'info',
    label: '크자회 소개',
    icon: <Question size={18} />,
    href: '/info',
  },
  {
    key: 'notifications',
    label: '알림',
    icon: <Bell size={18} />,
    href: '/notification',
  },
];

export const SIDEBAR_ITEMS = [...SIDEBAR_MAIN_ITEMS, ...SIDEBAR_BOTTOM_ITEMS];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: '홈', icon: <Home />, href: '/home' },
  { key: 'feed', label: '커뮤니티', icon: <Board />, href: '/feed' },
  {
    key: 'alumni-contacts',
    label: '동문수첩',
    icon: <Contacts />,
    href: '/alumni-contacts',
  },
  { key: 'setting', label: '내 정보', icon: <Setting />, href: '/setting' },
];
