import { API } from '@/shared/api';

import { NotificationUnreadCntResponse } from '..';

export const getNotificationUnreadCnt =
  async (): Promise<NotificationUnreadCntResponse> => {
    return await API.get<NotificationUnreadCntResponse>(
      '/api/v2/notifications/log/count',
    );
  };
