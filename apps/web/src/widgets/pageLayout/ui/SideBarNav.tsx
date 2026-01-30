'use client';

import { useRouter } from 'next/navigation';

import { Box, HStack, VStack, Flex, Sidebar } from '@causw/cds';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  SidebarKey,
} from '../model';

import { CountBadge, NotificationDot } from '@/shared';

type Props = {
  selected: SidebarKey;
};

export function SidebarNav({ selected }: Props) {
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
                <HStack className="gap-3.5">
                  <Sidebar.ItemIcon>{item.icon}</Sidebar.ItemIcon>
                  <Sidebar.ItemText>{item.label}</Sidebar.ItemText>
                </HStack>
              </Sidebar.Item>
            ))}
          </VStack>

          <VStack gap="sm" className="mt-auto">
            {SIDEBAR_BOTTOM_ITEMS.map((item) => (
              <Sidebar.Item key={item.key} value={item.key} asChild>
                <HStack className="gap-3.5 pr-2">
                  {/* icon + dot */}
                  <div className="relative">
                    <NotificationDot show={item.hasNotification} />
                    <Sidebar.ItemIcon asChild>{item.icon}</Sidebar.ItemIcon>
                  </div>

                  <Sidebar.ItemText>{item.label}</Sidebar.ItemText>

                  {/* badgeCount */}
                  <CountBadge count={item.badgeCount} />
                </HStack>
              </Sidebar.Item>
            ))}
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
  // 로그인 유저 정보로 대체 예정
  return (
    <Flex align="center" className="gap-3">
      <Box className="h-10 w-10 rounded-md bg-gray-200" />
      <Box className="flex-1">
        <Box className="text-sm font-bold text-gray-700">유지아</Box>
        <Box className="text-xs text-gray-400">djdkwnl@cau.ac.kr</Box>
      </Box>
      <Box className="text-xl text-gray-400">⋯</Box>
    </Flex>
  );
}
