export const notificationQueryKey = {
  all: ['notification'] as const,
  unreadCounts: () => [...notificationQueryKey.all, 'unreadCnt'] as const,
};
