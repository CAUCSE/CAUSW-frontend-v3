'use client';

import { VStack, Sidebar, Skeleton } from '@causw/cds';

import { useGetMeQuery } from '@/features/auth';

import { getProfileImageUrl } from '@/shared/lib';
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
  const { data: user, isLoading } = useGetMeQuery();

  const profileImageUrl = user?.profileImage
    ? getProfileImageUrl({
        profileImageType: user.profileImage.profileImageType,
        profileImageUrl: user.profileImage.profileImageUrl,
        width: 44,
      })
    : '';

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
        {/* TODO: api 연결, features/auth의 useLogout 훅 + widgets/auth의 LogoutConfirmModal 사용 */}
        {isLoading && (
          <Skeleton tone="neutral" width={227} height={60}></Skeleton>
        )}
        {user && !isLoading && (
          <FooterProfile
            img={profileImageUrl}
            name={user.name}
            email={user.email}
            onLogout={() => {}}
          />
        )}{' '}
      </Sidebar.Footer>
    </Sidebar>
  );
}
