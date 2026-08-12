import { ADMIN_ROUTES, ROUTES } from '@/shared/constants';

import { type NotificationLatestResponse } from '../model';

export const NOTIFICATION_LINK_TYPE = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
} as const;

export type NotificationLink =
  | { type: typeof NOTIFICATION_LINK_TYPE.INTERNAL; path: string }
  | { type: typeof NOTIFICATION_LINK_TYPE.EXTERNAL; url: string };

export function getNotificationPopupLink(
  data: Pick<
    NotificationLatestResponse,
    'noticeType' | 'targetId' | 'targetParentId'
  >,
): NotificationLink {
  const { noticeType, targetId, targetParentId } = data;

  switch (noticeType) {
    case 'COMMUNITY': // 커뮤니티 알림
    case 'OFFICIAL': // 공식 계정 알림
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: `${ROUTES.FEED}/${targetId}`,
      };

    case 'CEREMONY_V2': // 경조사 알림
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: `${ROUTES.CEREMONY}/${targetId}`,
      };

    case 'SYSTEM': // 시스템 알림
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: ROUTES.NOTIFICATION,
      };

    case 'LOCKER': // 사물함 알림
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: `${ROUTES.LOCKER}/${targetParentId}`,
      };

    case 'ADMIN': // 관리자 알림 (재학인증 요청 / 경조사 신청)
      return targetId
        ? {
            type: NOTIFICATION_LINK_TYPE.EXTERNAL,
            url: ADMIN_ROUTES.EVENTS(targetId), // 경조사 신청 알림
          }
        : {
            type: NOTIFICATION_LINK_TYPE.EXTERNAL,
            url: ADMIN_ROUTES.PENDING_USERS, // 재학인증 요청 알림
          };

    default:
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: ROUTES.NOTIFICATION,
      };
  }
}
