'use client';

import Link from 'next/link';

import { BottomNavigation } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, type BottomNavKey } from '../model';

interface BottomNavProps {
  selected: BottomNavKey;
}

export const BottomNav = ({ selected }: BottomNavProps) => (
  <BottomNavigation selected={selected}>
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
