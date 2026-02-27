import type { ActivityType } from '@/entities/setting';

import { buildMyFeedHref } from './navigation';

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

export const SETTING_ACTIVITY_ITEMS: SettingActivityItem[] = [
  {
    id: 'my-posts',
    label: '내가 쓴 글',
    href: buildMyFeedHref('my-posts', 'list'),
  },
  {
    id: 'my-comments',
    label: '댓글 단 글',
    href: buildMyFeedHref('my-comments', 'list'),
  },
  {
    id: 'favorites',
    label: '좋아요한 글',
    href: buildMyFeedHref('favorites', 'list'),
  },
];

export const SETTING_ACCOUNT_MENU_ITEMS: SettingAccountMenuItem[] = [
  { id: 'notifications', label: '알림 설정', href: '/setting/notifications' },
  { id: 'nickname', label: '닉네임 변경', href: '/setting/nickname' },
  { id: 'privacy', label: '개인 정보 관리', href: '/setting/privacy' },
  { id: 'password', label: '비밀번호 변경', href: '/setting/password' },
];

export const SETTING_SUPPORT_MENU_ITEMS: SettingSupportMenuItem[] = [
  { id: 'notices', label: '공지사항', href: '/setting/notices' },
  { id: 'report', label: '건의/오류 제보하기', href: '/setting/report' },
  { id: 'terms', label: '이용약관 확인', href: '/setting/terms' },
];
