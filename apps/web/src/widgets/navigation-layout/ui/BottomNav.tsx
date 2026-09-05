'use client';

import Link from 'next/link';

import { BottomNavigation } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, type BottomNavKey } from '../model';

interface BottomNavProps {
  selected: BottomNavKey;
}

export const BottomNav = ({ selected }: BottomNavProps) => (
  // CDS 기본값은 env()를 직접 쓰지만, Android는 네이티브가 --safe-area-inset-bottom 변수로 inset을 주입하므로 변수 기준으로 위치를 잡는다
  <BottomNavigation
    selected={selected}
    className="bottom-[max(1rem,var(--safe-area-inset-bottom))]"
  >
    {BOTTOM_NAV_ITEMS.map((item) => (
      <BottomNavigation.Item key={item.key} value={item.key} asChild>
        <Link href={item.href}>
          <BottomNavigation.Icon>{item.icon}</BottomNavigation.Icon>
          <BottomNavigation.Label>{item.label}</BottomNavigation.Label>
        </Link>
      </BottomNavigation.Item>
    ))}
  </BottomNavigation>
);
