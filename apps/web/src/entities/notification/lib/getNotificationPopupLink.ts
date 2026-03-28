import { ROUTES } from '@/shared/constants';

import { NotificationLatestResponse } from '../model';
export function getNotificationPopupLink(data: NotificationLatestResponse) {
  const { noticeType, targetId, targetParentId } = data;
  //TODO : 페이지 다 나오면 링크 수정
  switch (noticeType) {
    case 'POST':
    case 'COMMENT':
      if (targetParentId) {
        return `${ROUTES.FEED}/${targetParentId}/${targetId}`;
      }
      return `${ROUTES.FEED}/${targetId}`;

    case 'CEREMONY':
      return `${ROUTES.CEREMONY}/${targetId}`;

    case 'BOARD':
      return `${ROUTES.FEED}/${targetId}`;

    case 'ADMISSION':
      return `어디로..`;

    default:
      return ROUTES.NOTIFICATION;
  }
}
