import React from 'react';

import {
  Bell,
  Board,
  Book,
  Contacts,
  Home,
  Pen,
  Question,
  Comment,
} from '@causw/cds';

import type { BottomNavItem, NavItem } from './types';

export const MAIN_ITEMS: NavItem[] = [
  { key: 'home', label: '홈', icon: <Home /> },
  { key: 'community', label: '커뮤니티', icon: <Board size={18} /> },
  { key: 'write', label: '글쓰기', icon: <Pen size={18} /> },
  { key: 'directory', label: '동문수첩', icon: <Contacts size={18} /> },
  { key: 'profile', label: '내 동문수첩', icon: <Book size={18} /> },
];

export const BOTTOM_ITEMS: NavItem[] = [
  { key: 'about', label: '크자회 소개', icon: <Question size={18} /> },
  {
    key: 'notifications',
    label: '알림',
    icon: <Bell size={18} />,
    hasDot: true,
    badgeCount: 1,
  },
];
export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: '홈', icon: <Home /> },
  { key: 'community', label: '커뮤니티', icon: <Comment /> },
  { key: 'write', label: '글쓰기', icon: <Pen /> },
  { key: 'directory', label: '동문수첩', icon: <Contacts /> },
];
