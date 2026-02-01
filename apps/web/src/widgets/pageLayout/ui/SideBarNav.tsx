'use client';

import { useRouter } from 'next/navigation';

import { Box, HStack, VStack, Flex, Sidebar, Dropdown, Menu } from '@causw/cds';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  SidebarKey,
} from '../model';

import { CountBadge, NotificationDot } from '@/shared';

type Props = {
  selected?: SidebarKey;
  notificationCnt?: number;
};

export function SidebarNav({ selected, notificationCnt = 0 }: Props) {
  const router = useRouter();
  return (
    <Sidebar
      selected={selected}
      onSelectChange={(key) => {
        const item = SIDEBAR_ITEMS.find((i) => i.key === key);
        if (item) router.push(item.href);
      }}
    >
      {/* HEADER */}
      <Sidebar.Header>
        <DefaultHeader />
      </Sidebar.Header>

      {/* CONTENT */}
      <Sidebar.Content>
        <div className="flex h-full flex-col">
          <VStack gap="sm">
            {SIDEBAR_MAIN_ITEMS.map((item) => (
              <Sidebar.Item key={item.key} value={item.key} asChild>
                <HStack className="cursor-pointer gap-3.5">
                  <Sidebar.ItemIcon>{item.icon}</Sidebar.ItemIcon>
                  <Sidebar.ItemText>{item.label}</Sidebar.ItemText>
                </HStack>
              </Sidebar.Item>
            ))}
          </VStack>

          <VStack gap="sm" className="mt-auto pt-2">
            {SIDEBAR_BOTTOM_ITEMS.map((item) => {
              const hasNotification = item.key === 'notifications';
              return (
                <Sidebar.Item key={item.key} value={item.key} asChild>
                  <HStack className="cursor-pointer gap-3.5 pr-2">
                    {/* icon + dot */}
                    <div className="relative">
                      {hasNotification && (
                        <NotificationDot show={notificationCnt > 0} />
                      )}
                      <Sidebar.ItemIcon asChild>{item.icon}</Sidebar.ItemIcon>
                    </div>

                    <Sidebar.ItemText>{item.label}</Sidebar.ItemText>

                    {/* badgeCount */}
                    {hasNotification && <CountBadge count={notificationCnt} />}
                  </HStack>
                </Sidebar.Item>
              );
            })}
          </VStack>
        </div>
      </Sidebar.Content>

      {/* FOOTER */}
      <Sidebar.Footer>
        <DefaultFooter />
      </Sidebar.Footer>
    </Sidebar>
  );
}

function DefaultHeader() {
  //이미지 로고 대체 예정
  return <span className="px-2.5 font-bold text-blue-500">크자회 Logo</span>;
}

function DefaultFooter() {
  const router = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push('/setting')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') router.push('/setting');
      }}
      className="w-full cursor-pointer text-left select-none"
    >
      <Flex align="center" className="gap-3">
        <Box className="h-10 w-10 rounded-md bg-gray-200" />

        <Box className="flex-1">
          <Box className="text-sm font-bold text-gray-700">유지아</Box>
          <Box className="text-xs text-gray-400">djdkwnl@cau.ac.kr</Box>
        </Box>

        <Dropdown>
          <Dropdown.Trigger asChild>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              aria-label="menu"
            >
              <Menu active size={20} />
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content align="end">
            <Dropdown.Item
              className="justify-center px-10 py-2.5 text-base font-bold"
              onSelect={(e) => {
                e.preventDefault?.();
                // logout 실행
              }}
            >
              로그아웃
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </Flex>
    </div>
  );
}
