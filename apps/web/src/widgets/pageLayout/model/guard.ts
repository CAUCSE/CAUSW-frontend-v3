import { BOTTOM_NAV_ITEMS } from './navItems';
import type { BottomNavItem } from './types';

const bottomNavKeySet = new Set<BottomNavItem['key']>(
  BOTTOM_NAV_ITEMS.map((i) => i.key),
);

export function isBottomNavKey(v: unknown): v is BottomNavItem['key'] {
  return (
    typeof v === 'string' && bottomNavKeySet.has(v as BottomNavItem['key'])
  );
}
