import { API } from '@/shared/api';

import {
  NotificationLatestResponse,
  NotificationSettingsResponse,
  NotificationUnreadCntResponse,
} from '../model/types';

export const getNotificationUnreadCnt =
  async (): Promise<NotificationUnreadCntResponse> => {
    return await API.get<NotificationUnreadCntResponse>(
      '/api/v2/notifications/log/count',
    );
  };
export const getNotificationLatest =
  async (): Promise<NotificationLatestResponse> => {
    return await API.get<NotificationLatestResponse>(
      '/api/v2/notifications/log/latest',
    );
  };

export const getNotificationSettings =
  async (): Promise<NotificationSettingsResponse> => {
    return await API.get<NotificationSettingsResponse>(
      '/api/v2/notification-settings',
    );
  };
