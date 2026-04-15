import {
  buildMyFeedHref,
  type SettingAccountMenuItem,
  type SettingActivityItem,
  type SettingSupportMenuItem,
} from '../model';

export const SETTING_PROFILE_IDENTITY = {
  name: '이름',
  primaryInfo: '이메일',
  secondaryInfo: '이메일',
} as const;

export const SETTING_OVERVIEW_TITLES = {
  account: '계정',
  support: '고객지원',
} as const;

export const SETTING_NOTIFICATIONS = {
  title: '알림 설정',
  community: {
    title: '커뮤니티 알림',
  },
  official: {
    title: '공식계정 글 알림',
  },
  notice: {
    title: '시스템 알림',
  },
  event: {
    title: '경조사 알림',
  },
} as const;

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
  // { id: 'notices', label: '공지사항', href: '/setting/notices' },
  { id: 'report', label: '건의/오류 제보하기', href: '/setting/report' },
  { id: 'terms', label: '이용약관 확인', href: '/setting/terms' },
];
