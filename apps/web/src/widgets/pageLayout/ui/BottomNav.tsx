'use client';

import { useRouter } from 'next/navigation';

import { BottomNavigation } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, BottomNavKey } from '../model';

type Props = {
  selected: BottomNavKey;
};

export function BottomNav({ selected }: Props) {
  const router = useRouter();
  return (
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
  );
}
