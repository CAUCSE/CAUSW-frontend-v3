'use client';

import { VStack, Sidebar } from '@causw/cds';

import { QueryErrorBoundary } from '@/shared/ui';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  type SidebarKey,
} from '../../model';
import { FooterProfile } from '../FooterProfile';

import { NotificationItem } from './NotificationItem';
import { SideBarHeader } from './SidebarHeader';
import { SidebarMenuItem } from './SidebarMenuItem';

type SidebarNavProps = {
  selected?: SidebarKey;
};

export function SidebarNav({ selected }: SidebarNavProps) {
  return (
    <Sidebar selected={selected}>
      {/* HEADER */}
      <Sidebar.Header>
        <SideBarHeader />
      </Sidebar.Header>

      {/* CONTENT */}
      <Sidebar.Content>
        <div className="flex h-full flex-col">
          <VStack gap="sm">
            {SIDEBAR_MAIN_ITEMS.map((item) => (
              <SidebarMenuItem item={item} key={item.key} />
            ))}
          </VStack>

          <VStack gap="sm" className="mt-auto pt-2">
            {SIDEBAR_BOTTOM_ITEMS.map((item) => {
              if (item.key === 'notifications') {
                return (
                  <QueryErrorBoundary
                    key={item.key}
                    FallbackComponent={() => (
                      <SidebarMenuItem
                        item={item}
                        showDot={true}
                        badgeCount="!"
                      />
                    )}
                  >
                    <NotificationItem item={item} />
                  </QueryErrorBoundary>
                );
              }
              return <SidebarMenuItem item={item} key={item.key} />;
            })}
          </VStack>
        </div>
      </Sidebar.Content>

      {/* FOOTER */}
      <Sidebar.Footer>
        {/* 데이터 변경 필요 */}
        {/* TODO: api 연결 후 onLogout 기능 구현 필요 */}
        <FooterProfile
          img={''}
          name={'유지아'}
          email={'djdkwnl@cau.ac.kr'}
          onLogout={() => {}}
        />
      </Sidebar.Footer>
    </Sidebar>
  );
}
