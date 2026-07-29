import { ADMIN_BASE_URL } from '@/shared/config';
import { ROUTES } from '@/shared/constants';

import { type NotificationLatestResponse } from '../model';
export function getNotificationPopupLink(
  data: Pick<
    NotificationLatestResponse,
    'noticeType' | 'targetId' | 'targetParentId'
  >,
) {
  const { noticeType, targetId, targetParentId } = data;

  switch (noticeType) {
    case 'COMMUNITY': // 커뮤니티 알림
    case 'OFFICIAL': // 공식 계정 알림
      return `${ROUTES.FEED}/${targetId}`;

    case 'CEREMONY_V2': // 경조사 알림
      return `${ROUTES.CEREMONY}/${targetId}`;

    // targetId가 있으면 경조사 신청 관련 관리자向 알림 → 관리자 페이지로 이동
    case 'SYSTEM':
      return targetId
        ? `${ADMIN_BASE_URL}/events/${targetId}`
        : ROUTES.NOTIFICATION;

    case 'LOCKER': // 사물함 알림
      return `${ROUTES.LOCKER}/${targetParentId}`;

    default:
      return ROUTES.NOTIFICATION;
  }
}
