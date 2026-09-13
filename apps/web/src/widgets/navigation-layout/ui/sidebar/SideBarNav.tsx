'use client';

import { Separator, Sidebar } from '@causw/cds';

import { QueryErrorBoundary } from '@/shared/ui';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  type SidebarKey,
} from '../../model';

import { NotificationItem } from './NotificationItem';
import { SidebarMenuItem } from './SidebarMenuItem';

interface SidebarNavProps {
  selected?: SidebarKey;
}

export const SidebarNav = ({ selected }: SidebarNavProps) => (
  <Sidebar selected={selected}>
    <Sidebar.Content>
      {SIDEBAR_MAIN_ITEMS.map((item) => (
        <SidebarMenuItem item={item} key={item.key} />
      ))}

      <Separator className="my-0" />

      {SIDEBAR_BOTTOM_ITEMS.map((item) =>
        item.key === 'notifications' ? (
          <QueryErrorBoundary
            key={item.key}
            FallbackComponent={() => (
              <SidebarMenuItem item={item} badgeContent="!" />
            )}
          >
            <NotificationItem item={item} />
          </QueryErrorBoundary>
        ) : (
          <SidebarMenuItem item={item} key={item.key} />
        ),
      )}
    </Sidebar.Content>
  </Sidebar>
);
