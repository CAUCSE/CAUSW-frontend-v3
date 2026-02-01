import { BOTTOM_NAV_ITEMS, SIDEBAR_ITEMS } from './navItems';
import type { BottomNavKey, SidebarKey } from './types';

function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function pickSidebarKey(pathname: string): SidebarKey {
  const sorted = [...SIDEBAR_ITEMS].sort(
    (a, b) => b.href.length - a.href.length,
  );
  const found = sorted.find((it) => matchPathname(pathname, it.href))?.key;
  return (found ?? 'home') as SidebarKey;
}

export function isBottomNavVisible(pathname: string) {
  return BOTTOM_NAV_ITEMS.some((it) => pathname === it.href);
}

export function pickBottomNavKey(pathname: string): BottomNavKey {
  const found = BOTTOM_NAV_ITEMS.find((it) => pathname === it.href);
  return (found?.key ?? 'home') as BottomNavKey;
}
