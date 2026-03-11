export const notificationQueryKey = {
  all: ['notification'] as const,
  unreadCounts: () => [...notificationQueryKey.all, 'unreadCnt'] as const,
  latest: () => [...notificationQueryKey.all, 'latest'] as const,
  settings: () => [...notificationQueryKey.all, 'settings'] as const,
};
