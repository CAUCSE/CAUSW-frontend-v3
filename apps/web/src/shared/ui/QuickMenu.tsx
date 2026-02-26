import { Fragment } from 'react';

import Link from 'next/link';

import { HStack, Separator, Text } from '@causw/cds';

import { QUICK_MENU_ITEMS } from '@/shared/constants';

export function QuickMenu() {
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
