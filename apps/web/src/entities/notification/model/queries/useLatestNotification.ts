import { useQuery } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import { getNotificationLatest } from '../../api';
import { notificationQueryKey } from '../../config';

export const useLatestNotification = () => {
  return useQuery({
    queryKey: notificationQueryKey.latest(),
    queryFn: getNotificationLatest,
    staleTime: QUERY_STALE_TIME.SHORT,
    throwOnError: true,
  });
};
