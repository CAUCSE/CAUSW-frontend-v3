import { useQuery } from '@tanstack/react-query';

import { notificationQueryOptions } from '../../config';

export const useUnreadNotificationCnt = () => {
  return useQuery(notificationQueryOptions.unreadCounts());
};
