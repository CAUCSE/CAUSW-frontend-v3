import { ActivityType } from '@/entities/setting';

export const ACTIVITY_TABS: Array<{ key: ActivityType; label: string }> = [
  { key: 'my-posts', label: '내가 쓴 글' },
  { key: 'my-comments', label: '댓글 단 글' },
  { key: 'favorites', label: '찜한 글' },
];

export const ACTIVITY_TAB_KEYS: ActivityType[] = ACTIVITY_TABS.map(
  (tab) => tab.key,
);
