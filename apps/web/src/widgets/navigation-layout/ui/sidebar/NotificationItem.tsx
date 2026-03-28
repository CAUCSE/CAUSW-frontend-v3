import { useUnreadNotificationCnt } from '@/entities/notification';

import { SidebarItem } from '../../model';

import { SidebarMenuItem } from './SidebarMenuItem';

export function NotificationItem({ item }: { item: SidebarItem }) {
  const { data } = useUnreadNotificationCnt();

  const notificationCount = data?.notificationLogCount ?? 0;
  const unreadCnt = notificationCount > 9 ? '9+' : notificationCount;

  return (
    <SidebarMenuItem
      item={item}
      showDot={notificationCount > 0}
      badgeCount={unreadCnt}
    />
  );
}
