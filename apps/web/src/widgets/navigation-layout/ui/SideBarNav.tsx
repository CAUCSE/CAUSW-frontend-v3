'use client';

import Link from 'next/link';

import { HStack, VStack, Sidebar } from '@causw/cds';

import { useUnreadNotificationCnt } from '@/entities/notification';

import { CountBadge, QueryErrorBoundary, StatusDot } from '@/shared/ui';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  SidebarItem,
  SidebarKey,
} from '../model';

import { FooterProfile } from './FooterProfile';

type SidebarNavProps = {
  selected?: SidebarKey;
};

export function SidebarNav({ selected }: SidebarNavProps) {
  return (
    <Sidebar selected={selected}>
      {/* HEADER */}
      <Sidebar.Header>
        <DefaultHeader />
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
                    <NotificationSidebarItem item={item} />
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

function DefaultHeader() {
  /* TODO: 이미지 로고 대체 예정 */

  return <span className="px-2.5 font-bold text-blue-500">크자회 Logo</span>;
}

function SidebarMenuItem({
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
function NotificationSidebarItem({ item }: { item: SidebarItem }) {
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
