import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getNotificationUnreadCnt } from '../../api';
import { notificationQueryKey } from '../../config';

export const useUnreadNotificationCnt = () => {
  return useQuery({
    queryKey: notificationQueryKey.unreadCounts(),
    queryFn: getNotificationUnreadCnt,
    staleTime: QUERY_STALE_TIME.SHORT,
    throwOnError: true,
  });
};
