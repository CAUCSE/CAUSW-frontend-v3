import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { NOTIFICATION_END_POINT_PREFIX } from '../config';
import {
  type NotificationLatestResponse,
  type NotificationUnreadCntResponse,
} from '../model/types';
import {
  type GetNotificationsQuery,
  type GetPaginatedNotificationsResponseDto,
} from '../types';

export const getNotificationUnreadCnt =
  async (): Promise<NotificationUnreadCntResponse> => {
    return await API.get<NotificationUnreadCntResponse>(
      `${NOTIFICATION_END_POINT_PREFIX}/log/count`,
    );
  };

export const getNotificationLatest =
  async (): Promise<NotificationLatestResponse> => {
    return await API.get<NotificationLatestResponse>(
      `${NOTIFICATION_END_POINT_PREFIX}/log/latest`,
    );
  };

export const getNotifications = async (query: GetNotificationsQuery) => {
  const queryString = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryString.append(key, value);
    }
  });

  const url = `${NOTIFICATION_END_POINT_PREFIX}/log`;

  const path = withQuery(url, queryString.toString());

  return await API.get<GetPaginatedNotificationsResponseDto>(path);
};
