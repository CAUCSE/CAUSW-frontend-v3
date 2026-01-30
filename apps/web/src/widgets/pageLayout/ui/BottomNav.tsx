'use client';

import { useRouter } from 'next/navigation';

import { BottomNavigation, mergeStyles } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, BottomNavKey } from '../model';

type Props = {
  selected: BottomNavKey;
};

export function BottomNav({ selected }: Props) {
  const router = useRouter();
  return (
    <div className={mergeStyles('fixed right-0 bottom-0 left-0 md:hidden')}>
      <BottomNavigation
        selected={selected}
        onSelectChange={(key) => {
          const item = BOTTOM_NAV_ITEMS.find((i) => i.key === key);
          if (item) router.push(item.href);
        }}
      >
        {BOTTOM_NAV_ITEMS.map((item) => (
          <BottomNavigation.Item key={item.key} value={item.key}>
            <BottomNavigation.Icon>{item.icon}</BottomNavigation.Icon>
            <BottomNavigation.Label>{item.label}</BottomNavigation.Label>
          </BottomNavigation.Item>
        ))}
      </BottomNavigation>
    </div>
  );
}
