import { Fragment } from 'react';

import Link from 'next/link';

import { HStack, Separator, Text } from '@causw/cds';

import { QUICK_MENU_ITEMS } from '@/shared/constants';

export function QuickMenu() {
  const BUTTON_HOVER_STYLES = 'group cursor-pointer';
  const BUTTON_TEXT_HOVER_STYLES =
    'group-hover:text-gray-500 group-active:text-gray-500';
  return (
    <HStack className="w-full items-center justify-center gap-5 rounded-xl bg-white px-8 py-5">
      {QUICK_MENU_ITEMS.map((item, index) => (
        <Fragment key={item.label}>
          <Link
            href={item.href}
            className={`flex flex-col items-center gap-2 ${BUTTON_HOVER_STYLES}`}
          >
            {item.icon}
            <Text
              typography="body-14-medium"
              className={BUTTON_TEXT_HOVER_STYLES}
            >
              {item.label}
            </Text>
          </Link>

          {index !== QUICK_MENU_ITEMS.length - 1 && (
            <Separator className="mx-0 h-6 shrink-0" orientation="vertical" />
          )}
        </Fragment>
      ))}
    </HStack>
  );
}
