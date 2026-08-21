import { useUnreadNotificationCnt } from '@/entities/notification';

import { type SidebarItem } from '../../model';

import { SidebarMenuItem } from './SidebarMenuItem';

export function NotificationItem({
  item,
  selected,
}: {
  item: SidebarItem;
  selected: boolean;
}) {
  const { data } = useUnreadNotificationCnt();

  const notificationCount = data?.notificationLogCount ?? 0;
  return (
    <SidebarMenuItem
      item={item}
      selected={selected}
      showDot={notificationCount > 0}
    />
  );
}
