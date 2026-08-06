import { BOTTOM_NAV_ITEMS, SIDEBAR_ITEMS } from './navItems';
import type { BottomNavKey, SidebarKey } from './types';

function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function pickSidebarKey(pathname: string): SidebarKey | undefined {
  const sorted = [...SIDEBAR_ITEMS].sort(
    (a, b) => b.href.length - a.href.length,
  );
  return sorted.find((it) => matchPathname(pathname, it.href))?.key;
}
export function isBottomNavVisible(pathname: string) {
  return BOTTOM_NAV_ITEMS.some((it) => pathname === it.href);
}

export function pickBottomNavKey(pathname: string): BottomNavKey {
  const found = BOTTOM_NAV_ITEMS.find((it) => pathname === it.href);
  return (found?.key ?? 'home') as BottomNavKey;
}

// TODO: 전체 리뉴얼 전 임시 화이트 배경 적용 대상
const WHITE_BACKGROUND_PATHS = ['/profile', '/alumni-contacts'];

export function isWhiteBackgroundPage(pathname: string) {
  return WHITE_BACKGROUND_PATHS.some((href) => matchPathname(pathname, href));
}
