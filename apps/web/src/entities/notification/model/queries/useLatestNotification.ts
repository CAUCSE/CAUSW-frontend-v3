import { useQuery } from '@tanstack/react-query';

import { getNotificationLatest } from '../../api';
import { notificationQueryKey } from '../../config';

export const useLatestNotification = () => {
  return useQuery({
    queryKey: notificationQueryKey.latest(),
    queryFn: getNotificationLatest,
    staleTime: 1000 * 60,
    throwOnError: true,
  });
};
