import { HttpResponse, passthrough } from 'msw';

import { mswHttp } from '@/shared/lib';

import { type GetNotificationsResponseDto } from '../model';

import {
  notificationMockDbAllRead,
  notificationMockDbAllUnread,
} from './notificationMockDb';

const NOTIFICATIONS_API_PREFIX = '/api/v2/notifications';

export const getHandler = [
  mswHttp.get<GetNotificationsResponseDto[]>(
    `${NOTIFICATIONS_API_PREFIX}/log`,
    ({ request }) => {
      return passthrough();

      const url = new URL(request.url);
      const isRead = url.searchParams.get('isRead');
      if (isRead === 'true') {
        return HttpResponse.json({
          code: 'S000',
          message: '요청 처리 성공',
          data: notificationMockDbAllRead,
        });
      } else {
        return HttpResponse.json({
          code: 'S000',
          message: '요청 처리 성공',
          data: notificationMockDbAllUnread,
        });
      }
    },
  ),
];
