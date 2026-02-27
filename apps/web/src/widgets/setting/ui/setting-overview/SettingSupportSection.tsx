import { type ReactNode } from 'react';

import {
  ChevronRight,
  DocumentColored,
  QuestionColored,
  SpeakerColored,
  Text,
  VStack,
} from '@causw/cds';

import { SETTING_OVERVIEW_TITLES } from '../../config';
import type { SettingSupportMenuItem } from '../../model';
import { SETTING_SUPPORT_MENU_ITEMS } from '../../model';

type SettingSupportSectionProps = {
  onNavigate: (href: string) => void;
};

const ROW_BUTTON_CLASS =
  'flex w-full items-center gap-3.5 rounded-md p-2 text-left transition-colors hover:bg-gray-50 active:bg-gray-100';

const SUPPORT_ICON_MAP: Record<SettingSupportMenuItem['id'], ReactNode> = {
  notices: <SpeakerColored />,
  report: <QuestionColored />,
  terms: <DocumentColored />,
};

export const SettingSupportSection = ({
  onNavigate,
}: SettingSupportSectionProps) => {
  return (
    <VStack
      gap="sm"
      className="flex h-full w-full rounded-lg bg-white px-4 py-5"
    >
      <Text typography="subtitle-18-bold" className="px-2">
        {SETTING_OVERVIEW_TITLES.support}
      </Text>
      {SETTING_SUPPORT_MENU_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={ROW_BUTTON_CLASS}
          onClick={() => onNavigate(item.href)}
        >
          {SUPPORT_ICON_MAP[item.id]}
          <Text typography="body-16-regular" textColor="gray-800">
            {item.label}
          </Text>
          <ChevronRight className="ml-auto flex" size="12" />
        </button>
      ))}
    </VStack>
  );
};
