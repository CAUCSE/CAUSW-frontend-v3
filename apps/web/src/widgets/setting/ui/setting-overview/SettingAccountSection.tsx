import { type ReactNode } from 'react';

import {
  BellColored,
  ChevronRight,
  GearColored,
  LockOpenColored,
  TagColored,
  Text,
  VStack,
} from '@causw/cds';

import type { SettingAccountMenuItem } from '../../model';
import { SETTING_ACCOUNT_MENU_ITEMS } from '../../model';

type SettingAccountSectionProps = {
  onNavigate: (href: string) => void;
};

const ROW_BUTTON_CLASS =
  'flex w-full items-center gap-3.5 rounded-md p-2 text-left transition-colors hover:bg-gray-50 active:bg-gray-100';

const ACCOUNT_ICON_MAP: Record<SettingAccountMenuItem['id'], ReactNode> = {
  notifications: <BellColored />,
  nickname: <TagColored />,
  privacy: <GearColored />,
  password: <LockOpenColored />,
};

export const SettingAccountSection = ({
  onNavigate,
}: SettingAccountSectionProps) => {
  return (
    <VStack
      gap="sm"
      className="flex h-full w-full rounded-lg bg-white px-4 py-5"
    >
      <Text typography="subtitle-18-bold" className="px-2">
        계정
      </Text>
      {SETTING_ACCOUNT_MENU_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={ROW_BUTTON_CLASS}
          onClick={() => onNavigate(item.href)}
        >
          {ACCOUNT_ICON_MAP[item.id]}
          <Text typography="body-16-regular" textColor="gray-800">
            {item.label}
          </Text>
          <ChevronRight className="ml-auto flex" size="12" />
        </button>
      ))}
    </VStack>
  );
};
