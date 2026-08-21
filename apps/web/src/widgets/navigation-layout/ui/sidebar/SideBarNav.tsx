import { VStack } from '@causw/cds';

import { QueryErrorBoundary } from '@/shared/ui';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  type SidebarKey,
} from '../../model';

import { NotificationItem } from './NotificationItem';
import { SidebarMenuItem } from './SidebarMenuItem';

type SidebarNavProps = {
  selected?: SidebarKey;
};

export function SidebarNav({ selected }: SidebarNavProps) {
  return (
    <nav
      aria-label="주요 내비게이션"
      className="flex h-[1000px] w-[68px] shrink-0 flex-col items-start gap-8 border-r border-gray-100 bg-white px-3 pt-[120px]"
    >
      <VStack gap="xl" className="items-start">
        {SIDEBAR_MAIN_ITEMS.map((item) => (
          <SidebarMenuItem
            item={item}
            key={item.key}
            selected={selected === item.key}
          />
        ))}
      </VStack>

      <div className="w-full border-t border-gray-100" />

      <VStack gap="xl" className="items-start">
        {SIDEBAR_BOTTOM_ITEMS.map((item) => {
          if (item.key === 'notifications') {
            return (
              <QueryErrorBoundary
                key={item.key}
                FallbackComponent={() => (
                  <SidebarMenuItem
                    item={item}
                    selected={selected === item.key}
                    showDot
                  />
                )}
              >
                <NotificationItem
                  item={item}
                  selected={selected === item.key}
                />
              </QueryErrorBoundary>
            );
          }

          return (
            <SidebarMenuItem
              item={item}
              key={item.key}
              selected={selected === item.key}
            />
          );
        })}
      </VStack>
    </nav>
  );
}
