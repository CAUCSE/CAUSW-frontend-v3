import { useUnreadNotificationCnt } from '@/entities/notification';

import { type SidebarItem } from '../../model';

import { SidebarMenuItem } from './SidebarMenuItem';

const MAX_DISPLAY_COUNT = 9;

const formatUnreadCount = (unreadCount: number) =>
  unreadCount > MAX_DISPLAY_COUNT ? `${MAX_DISPLAY_COUNT}+` : unreadCount;

export const NotificationItem = ({ item }: { item: SidebarItem }) => {
  const { data } = useUnreadNotificationCnt();
  const unreadCount = data?.notificationLogCount ?? 0;

  return (
    <SidebarMenuItem
      item={item}
      badgeContent={
        unreadCount > 0 ? formatUnreadCount(unreadCount) : undefined
      }
    />
  );
};
