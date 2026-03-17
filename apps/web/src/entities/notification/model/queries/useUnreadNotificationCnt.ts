import { useQuery } from '@tanstack/react-query';

import {
  getNotificationUnreadCnt,
  notificationQueryKey,
} from '@/entities/notification';

import { QUERY_STALE_TIME } from '@/shared/constants';

export const useUnreadNotificationCnt = () => {
  return useQuery({
    queryKey: notificationQueryKey.unreadCounts(),
    queryFn: getNotificationUnreadCnt,
    staleTime: QUERY_STALE_TIME.SHORT,
    throwOnError: true,
  });
};
