import { GRAY_BACKGROUND_PATHS } from '@/shared/constants';

import { BOTTOM_NAV_ITEMS, SIDEBAR_ITEMS } from './navItems';
import type { BottomNavKey, SidebarKey } from './types';

function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function pickSidebarKey(pathname: string): SidebarKey | undefined {
  const candidates = SIDEBAR_ITEMS.flatMap((it) =>
    [it.href, ...(it.activeHrefs ?? [])].map((href) => ({
      key: it.key,
      href,
    })),
  );
  const sorted = candidates.sort((a, b) => b.href.length - a.href.length);
  return sorted.find((candidate) => matchPathname(pathname, candidate.href))
    ?.key;
}
export function isBottomNavVisible(pathname: string) {
  return BOTTOM_NAV_ITEMS.some((it) =>
    [it.href, ...(it.activeHrefs ?? [])].some((href) => pathname === href),
  );
}

export function pickBottomNavKey(pathname: string): BottomNavKey {
  const found = BOTTOM_NAV_ITEMS.find((it) =>
    [it.href, ...(it.activeHrefs ?? [])].some((href) => pathname === href),
  );
  return (found?.key ?? 'home') as BottomNavKey;
}

export function isGrayBackgroundPage(pathname: string) {
  return GRAY_BACKGROUND_PATHS.some((href) => matchPathname(pathname, href));
}
