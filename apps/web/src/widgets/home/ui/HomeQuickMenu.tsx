import { Fragment } from 'react';

import Link from 'next/link';

import {
  FlagColored,
  HStack,
  LockerColored,
  Separator,
  Text,
} from '@causw/cds';
import { Board } from '@causw/cds';

import { COPY, EXTERNAL_ROUTES, ROUTES } from '@/shared';

//TODO : 학식 메뉴 아이콘 바꾸기

const QUICK_MENU_ITEMS = [
  {
    label: COPY.QUICK_MENU_MEETINGROOM,
    icon: <FlagColored size={24} />,
    href: EXTERNAL_ROUTES.CAU_MEETINGROOM,
  },
  {
    label: COPY.QUICK_MENU_CAFETERIA,
    icon: <Board size={24} />,
    href: EXTERNAL_ROUTES.CAU_CAFETERIA,
  },
  {
    label: COPY.QUICK_MENU_LOCKER,
    icon: <LockerColored size={24} />,
    href: ROUTES.LOCKER,
  },
];

export function HomeQuickMenu() {
  return (
    <HStack className="w-full items-center justify-around rounded-2xl bg-white px-8 py-5">
      {QUICK_MENU_ITEMS.map((item, index) => (
        <Fragment key={item.label}>
          <Link href={item.href} className="flex flex-col items-center gap-2">
            {item.icon}
            <Text typography="body-14-medium">{item.label}</Text>
          </Link>

          {index !== QUICK_MENU_ITEMS.length - 1 && (
            <Separator
              className="h-6 shrink-0 self-center"
              orientation="vertical"
            />
          )}
        </Fragment>
      ))}
    </HStack>
  );
}
