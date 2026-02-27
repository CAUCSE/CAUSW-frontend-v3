import { useQuery } from '@tanstack/react-query';

import { getNotificationUnreadCnt } from '../../api';
import { notificationQueryKey } from '../../config';

export const useNotificationUnreadCnt = () => {
  return useQuery({
    queryKey: notificationQueryKey.unreadCounts(),
    queryFn: getNotificationUnreadCnt,
    staleTime: 1000 * 60,
    throwOnError: true,
  });
};
