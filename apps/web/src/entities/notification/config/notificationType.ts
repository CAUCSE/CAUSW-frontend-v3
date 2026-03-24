import { type ValueOf } from '@/shared/lib';

export const NOTIFICATION_TYPE = {
  COMMUNITY: {
    type: 'COMMUNITY',
    label: '커뮤니티 알림',
  },
  OFFICIAL: {
    type: 'OFFICIAL',
    label: '공식계정 글 알림',
  },
  CEREMONY: {
    type: 'CEREMONY',
    label: '경조사 알림',
  },
  SYSTEM: {
    type: 'SYSTEM',
    label: '시스템 알림',
  },
} as const;

export type NotificationType = ValueOf<typeof NOTIFICATION_TYPE>['type'];
