'use client';

import Link from 'next/link';

import { BottomNavigation } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, type BottomNavKey } from '../model';

type Props = {
  selected: BottomNavKey;
};

export function BottomNav({ selected }: Props) {
  return (
    <BottomNavigation
      selected={selected}
      className="right-auto bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 h-15 w-[calc(100%-32px)] max-w-[360px] -translate-x-1/2 justify-center gap-10 rounded-[32px] px-4 py-0 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
    >
      {BOTTOM_NAV_ITEMS.map((item) => (
        <BottomNavigation.Item
          key={item.key}
          value={item.key}
          asChild
          className="w-8 flex-none"
        >
          <Link href={item.href} className="block">
            <BottomNavigation.Icon className="h-5 w-5">
              {item.icon}
            </BottomNavigation.Icon>
            <BottomNavigation.Label className="text-[8px] leading-3 whitespace-nowrap">
              {item.label}
            </BottomNavigation.Label>
          </Link>
        </BottomNavigation.Item>
      ))}
    </BottomNavigation>
  );
}
