import Link from 'next/link';

import { Sidebar } from '@causw/cds';

import { type SidebarItem } from '../../model';

import { SidebarItemBadge } from './SidebarItemBadge';

interface SidebarMenuItemProps {
  item: SidebarItem;
  /** 아이콘 우상단에 표시할 배지 내용. 없으면 배지를 렌더링하지 않는다 */
  badgeContent?: number | string;
}

export const SidebarMenuItem = ({
  item,
  badgeContent,
}: SidebarMenuItemProps) => (
  <Sidebar.Item value={item.key} asChild>
    <Link href={item.href}>
      <span className="relative flex">
        <Sidebar.ItemIcon asChild>{item.icon}</Sidebar.ItemIcon>
        {badgeContent !== undefined && (
          <SidebarItemBadge>{badgeContent}</SidebarItemBadge>
        )}
      </span>
      <Sidebar.ItemText>{item.label}</Sidebar.ItemText>
    </Link>
  </Sidebar.Item>
);
