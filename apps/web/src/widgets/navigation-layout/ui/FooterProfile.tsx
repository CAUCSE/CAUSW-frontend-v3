'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Box, Flex, Dropdown, Menu } from '@causw/cds';

import type { UserProfileImageType } from '@/shared/types';
import { ProfileAvatar } from '@/shared/ui';

type Props = {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
  name: string;
  email: string;
  onLogout: () => void;
};

export function FooterProfile({
  profileImageType,
  profileImageUrl,
  name,
  email,
  onLogout,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isSettingRoute = pathname?.startsWith('/setting');

  return (
    <div
      role="button"
      tabIndex={0}
      className={`w-full cursor-pointer rounded-md px-2.5 py-2 text-left transition-colors select-none hover:bg-gray-50 active:bg-gray-100 ${
        isSettingRoute ? 'bg-gray-50' : ''
      }`}
      onClick={() => router.push('/setting')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') router.push('/setting');
      }}
    >
      <Flex align="center" className="gap-3">
        <div className="shrink-0">
          <ProfileAvatar
            profileImageType={profileImageType}
            profileImageUrl={profileImageUrl}
            size={44}
          />
        </div>
        <Box className="min-w-0 flex-1">
          <Box className="typo-subtitle-16-bold truncate text-gray-700">
            {name}
          </Box>
          <Box className="typo-caption-12-semibold truncate text-gray-400">
            {email}
          </Box>
        </Box>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <button
              type="button"
              aria-label="menu"
              // radix ui app router 노운 이슈로 인한 문제 해결을 위한 코드
              suppressHydrationWarning
              className="shrink-0 cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-200 active:bg-gray-300"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Menu active size={20} />
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content
            align="end"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Dropdown.Item
              data-profile-menu-action="true"
              className="justify-center px-10 py-2.5 text-base font-bold"
              onSelect={(e) => {
                e.preventDefault?.();
                onLogout();
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
