'use client';

import { useState, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import {
  BellColored,
  ChevronRight,
  GearColored,
  LockOpenColored,
  TagColored,
  Text,
  VStack,
} from '@causw/cds';

import { NicknameChangeDialog } from '@/widgets/setting';

import { SETTING_OVERVIEW_TITLES } from '../../config';
import { SETTING_ACCOUNT_MENU_ITEMS } from '../../config';
import type { SettingAccountMenuItem } from '../../model';

const ROW_BUTTON_CLASS =
  'flex cursor-pointer w-full items-center gap-3.5 rounded-md p-2 text-left transition-colors hover:bg-gray-50 active:bg-gray-100';

const ACCOUNT_ICON_MAP: Record<SettingAccountMenuItem['id'], ReactNode> = {
  notifications: <BellColored />,
  nickname: <TagColored />,
  privacy: <GearColored />,
  password: <LockOpenColored />,
};

export const SettingAccountSection = () => {
  const router = useRouter();
  const [nicknameDialogOpen, setNicknameDialogOpen] = useState(false);

  const handleNavigate = (href: string) => {
    if (href === '/setting/nickname') {
      setNicknameDialogOpen(true);
      return;
    }

    router.push(href);
  };

  return (
    <>
      <VStack
        gap="sm"
        className="flex h-full w-full rounded-lg bg-white px-4 py-5"
      >
        <Text typography="subtitle-18-bold" className="px-2">
          {SETTING_OVERVIEW_TITLES.account}
        </Text>
        {SETTING_ACCOUNT_MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={ROW_BUTTON_CLASS}
            onClick={() => handleNavigate(item.href)}
          >
            {ACCOUNT_ICON_MAP[item.id]}
            <Text typography="body-16-regular" textColor="gray-800">
              {item.label}
            </Text>
            <ChevronRight className="ml-auto flex" size="12" />
          </button>
        ))}
      </VStack>
      <NicknameChangeDialog
        open={nicknameDialogOpen}
        onOpenChange={setNicknameDialogOpen}
      />
    </>
  );
};
