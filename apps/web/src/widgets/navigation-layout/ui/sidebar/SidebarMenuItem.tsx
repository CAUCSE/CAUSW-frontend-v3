import Link from 'next/link';

import { HStack, Sidebar } from '@causw/cds';

import { CountBadge, StatusDot } from '@/shared/ui';

import { type SidebarItem } from '../../model';

export function SidebarMenuItem({
  item,
  showDot = false,
  badgeCount = 0,
}: {
  item: SidebarItem;
  showDot?: boolean;
  badgeCount?: number | string;
}) {
  return (
    <Sidebar.Item value={item.key} asChild>
      <Link href={item.href} className="block pr-2">
        <HStack className="w-full cursor-pointer items-center gap-3.5">
          <div className="relative">
            {showDot && <StatusDot show={true} right={-2} top={-2} />}
            <Sidebar.ItemIcon asChild>{item.icon}</Sidebar.ItemIcon>
          </div>

          <Sidebar.ItemText>{item.label}</Sidebar.ItemText>

          {!!badgeCount && <CountBadge count={badgeCount} />}
        </HStack>
      </Link>
    </Sidebar.Item>
  );
}
