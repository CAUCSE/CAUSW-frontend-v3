'use client';

import { useRouter } from 'next/navigation';

import { HStack, VStack, Sidebar } from '@causw/cds';

import {
  SIDEBAR_BOTTOM_ITEMS,
  SIDEBAR_ITEMS,
  SIDEBAR_MAIN_ITEMS,
  SidebarKey,
} from '../model';

import { FooterProfile } from './FooterProfile';

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
        {/* 데이터 변경 필요 */}
        <FooterProfile
          img={'https://avatars.githubusercontent.com/u/54893898?v=4'}
          name={'유지아'}
          email={'djdkwnl@cau.ac.kr'}
          onLogout={() => {}}
        />
      </Sidebar.Footer>
    </Sidebar>
  );
}

function DefaultHeader() {
  //이미지 로고 대체 예정
  return <span className="px-2.5 font-bold text-blue-500">크자회 Logo</span>;
}
