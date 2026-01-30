'use client';

import { BottomNavigation, mergeStyles } from '@causw/cds';

import { BOTTOM_NAV_ITEMS, BottomNavItem, NavKey } from '../model';

type Props = {
  selected: NavKey;
  onSelectChange: (key: NavKey) => void;
  className?: string;
  fixed?: boolean;
};

export function BottomNav({
  selected,
  onSelectChange,
  className,
  fixed = true,
}: Props) {
  return (
    <div
      className={mergeStyles(
        'xl:hidden',
        fixed && 'fixed right-0 bottom-0 left-0',
        className,
      )}
    >
      <BottomNavigation
        selected={selected}
        onSelectChange={(val) => onSelectChange(val as BottomNavItem['key'])}
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
