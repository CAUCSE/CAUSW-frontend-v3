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

    // targetId가 있으면 경조사 신청 관련 관리자向 알림 → 관리자 페이지로 이동
    case 'SYSTEM':
      return targetId
        ? {
            type: NOTIFICATION_LINK_TYPE.EXTERNAL,
            url: ADMIN_ROUTES.EVENTS(targetId),
          }
        : { type: NOTIFICATION_LINK_TYPE.INTERNAL, path: ROUTES.NOTIFICATION };

    case 'LOCKER': // 사물함 알림
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: `${ROUTES.LOCKER}/${targetParentId}`,
      };

    default:
      return {
        type: NOTIFICATION_LINK_TYPE.INTERNAL,
        path: ROUTES.NOTIFICATION,
      };
  }
}
