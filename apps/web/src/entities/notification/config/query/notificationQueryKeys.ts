import { type GetNotificationsQuery } from '../../model';

export const notificationQueryKeys = {
  all: ['notification'] as const,
  unreadCounts: () => [...notificationQueryKeys.all, 'unreadCnt'] as const,
  latest: () => [...notificationQueryKeys.all, 'latest'] as const,
  list: (query: GetNotificationsQuery) =>
    [...notificationQueryKeys.all, 'list', query] as const,
  settings: () => [...notificationQueryKeys.all, 'settings'] as const,
};
