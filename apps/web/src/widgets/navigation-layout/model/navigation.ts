import { GRAY_BACKGROUND_PATHS } from '@/shared/constants';

import { BOTTOM_NAV_ITEMS, SIDEBAR_ITEMS } from './navItems';
import type { BottomNavKey, SidebarKey } from './types';

const matchPathname = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const pickSidebarKey = (pathname: string): SidebarKey | undefined => {
  const candidates = SIDEBAR_ITEMS.flatMap((item) =>
    [item.href, ...(item.activeHrefs ?? [])].map((href) => ({
      key: item.key,
      href,
    })),
  );
  const sortedByHrefLength = candidates.sort(
    (a, b) => b.href.length - a.href.length,
  );
  return sortedByHrefLength.find((candidate) =>
    matchPathname(pathname, candidate.href),
  )?.key;
};

export const isBottomNavVisible = (pathname: string) =>
  BOTTOM_NAV_ITEMS.some((item) =>
    [item.href, ...(item.activeHrefs ?? [])].some((href) => pathname === href),
  );

export const pickBottomNavKey = (pathname: string): BottomNavKey => {
  const matchedItem = BOTTOM_NAV_ITEMS.find((item) =>
    [item.href, ...(item.activeHrefs ?? [])].some((href) => pathname === href),
  );
  return matchedItem?.key ?? 'home';
};

export const isGrayBackgroundPage = (pathname: string) =>
  GRAY_BACKGROUND_PATHS.some((href) => matchPathname(pathname, href));
