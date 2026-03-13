import { HttpResponse } from 'msw';

import { mswHttp } from '@/shared/lib';

import type { GetPaginatedNotificationsResponseDto } from '../types';

import {
  notificationMockDbAllRead,
  notificationMockDbAllUnread,
} from './notificationMockDb';

const NOTIFICATIONS_API_PREFIX = '/api/v2/notifications';

export const getHandler = [
  mswHttp.get<GetPaginatedNotificationsResponseDto>(
    `${NOTIFICATIONS_API_PREFIX}/log`,
    ({ request }) => {
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
