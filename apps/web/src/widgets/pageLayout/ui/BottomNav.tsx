'use client';

import { BottomNavigation, mergeStyles } from '@causw/cds';

import { BOTTOM_NAV_ITEMS } from '../model/navItems';
import type { BottomNavItem, NavKey } from '../model/types';

type Props = {
  selected: NavKey;
  onSelectChange: (key: NavKey) => void;
  className?: string;
  fixed?: boolean;
};

function isBottomNavKey(v: unknown): v is BottomNavItem['key'] {
  return (
    v === 'home' || v === 'community' || v === 'write' || v === 'directory'
  );
}

export function BottomNav({
  selected,
  onSelectChange,
  className,
  fixed = true,
}: Props) {
  const handleSelectChange = (val: unknown) => {
    if (isBottomNavKey(val)) onSelectChange(val);
  };

  return (
    <div
      className={mergeStyles(
        'xl:hidden',
        fixed && 'fixed right-0 bottom-0 left-0',
        className,
      )}
    >
      <BottomNavigation selected={selected} onSelectChange={handleSelectChange}>
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
