'use client';

import Link from 'next/link';

import { BottomNavigation } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, type BottomNavKey } from '../model';

type Props = {
  selected: BottomNavKey;
};
//TODO : 바텀 네비게이션 디자인 시스템 수정 후 확인 (배경 색 및 box-shadow)

export function BottomNav({ selected }: Props) {
  return (
    <BottomNavigation selected={selected}>
      {BOTTOM_NAV_ITEMS.map((item) => (
        <BottomNavigation.Item key={item.key} value={item.key} asChild>
          <Link href={item.href} className="block">
            <BottomNavigation.Icon>{item.icon}</BottomNavigation.Icon>
            <BottomNavigation.Label>{item.label}</BottomNavigation.Label>
          </Link>
        </BottomNavigation.Item>
      ))}
    </BottomNavigation>
  );
}
