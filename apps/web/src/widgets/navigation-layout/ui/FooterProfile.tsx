'use client';

import { useRouter } from 'next/navigation';

import { Box, Flex, Dropdown, Menu, Avatar } from '@causw/cds';

type Props = {
  img: string;
  name: string;
  email: string;
  onLogout: () => void;
};

export function FooterProfile({ img, name, email, onLogout }: Props) {
  const router = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      className="w-full cursor-pointer text-left select-none"
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
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
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
