'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Box, Flex, Dropdown, Menu, Avatar } from '@causw/cds';

type Props = {
  img: string;
  name: string;
  email: string;
  onLogout: () => void;
};

export function FooterProfile({ img, name, email, onLogout }: Props) {
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
        <Avatar size="44" src={img} />
        <Box className="flex-1">
          <Box className="text-sm font-bold text-gray-700">{name}</Box>
          <Box className="text-xs text-gray-400">{email}</Box>
        </Box>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <button
              type="button"
              aria-label="menu"
              className="cursor-pointer rounded-sm p-1 transition-colors hover:bg-gray-200 active:bg-gray-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Menu active size={20} />
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content align="end">
            <Dropdown.Item
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
