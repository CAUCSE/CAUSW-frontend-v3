'use client';

import React from 'react';

import { Box, Float, HStack, VStack, Flex, Sidebar } from '@causw/cds';

import { MAIN_ITEMS, BOTTOM_ITEMS, NavKey } from '../model';

type Props = {
  selected: NavKey;
  onSelectChange: (key: NavKey) => void;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
};

export function SidebarNav({
  selected,
  onSelectChange,
  headerSlot,
  footerSlot,
}: Props) {
  return (
    <Sidebar
      selected={selected}
      onSelectChange={(v) => onSelectChange(String(v) as NavKey)}
    >
      {/* HEADER */}
      <Sidebar.Header>{headerSlot ?? <DefaultHeader />}</Sidebar.Header>

      {/* CONTENT */}
      <Sidebar.Content>
        <div className="flex h-full flex-col">
          <VStack gap="sm">
            {MAIN_ITEMS.map((item) => (
              <Sidebar.Item key={item.key} value={item.key} asChild>
                <HStack className="gap-3.5">
                  <Sidebar.ItemIcon>{item.icon}</Sidebar.ItemIcon>
                  <Sidebar.ItemText>{item.label}</Sidebar.ItemText>
                </HStack>
              </Sidebar.Item>
            ))}
          </VStack>

          <VStack gap="sm" className="mt-auto">
            {BOTTOM_ITEMS.map((item) => (
              <Sidebar.Item key={item.key} value={item.key} asChild>
                <HStack className="gap-3.5 pr-2">
                  {/* icon + dot */}
                  <div className="relative">
                    {item.hasDot && (
                      <Float floatType="absolute" top={-2} right={-2}>
                        <div className="h-1 w-1 rounded-full bg-red-500" />
                      </Float>
                    )}
                    <Sidebar.ItemIcon asChild>{item.icon}</Sidebar.ItemIcon>
                  </div>

                  <Sidebar.ItemText>{item.label}</Sidebar.ItemText>

                  {/* badgeCount */}
                  {typeof item.badgeCount === 'number' && (
                    <Box className="ml-auto flex h-6 w-6 items-center justify-center rounded-sm bg-red-100 text-xs text-red-400">
                      {item.badgeCount}
                    </Box>
                  )}
                </HStack>
              </Sidebar.Item>
            ))}
          </VStack>
        </div>
      </Sidebar.Content>

      {/* FOOTER */}
      <Sidebar.Footer>{footerSlot ?? <DefaultFooter />}</Sidebar.Footer>
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
