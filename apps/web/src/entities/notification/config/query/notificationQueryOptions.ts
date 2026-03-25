import { queryOptions } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/shared/constants';

import {
  getNotificationLatest,
  getNotifications,
  getNotificationUnreadCnt,
} from '../../api';
import { type GetNotificationsQuery } from '../../model';

import { notificationQueryKeys } from './notificationQueryKeys';

export const notificationQueryOptions = {
  unreadCounts: () =>
    queryOptions({
      queryKey: notificationQueryKeys.unreadCounts(),
      queryFn: getNotificationUnreadCnt,
      staleTime: QUERY_STALE_TIME.SHORT,
      throwOnError: true,
    }),
  latest: () =>
    queryOptions({
      queryKey: notificationQueryKeys.latest(),
      queryFn: getNotificationLatest,
      staleTime: QUERY_STALE_TIME.SHORT,
      throwOnError: true,
    }),
  list: (query: GetNotificationsQuery) =>
    queryOptions({
      queryKey: notificationQueryKeys.list(query),
      queryFn: () => getNotifications(query),
      staleTime: QUERY_STALE_TIME.NONE,
      throwOnError: true,
    }),
};
