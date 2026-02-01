'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import {
  BOTTOM_NAV_ITEMS,
  SIDEBAR_ITEMS,
  SidebarKey,
  type BottomNavKey,
} from '../model';

import { BottomNav } from './BottomNav';
import { SidebarNav } from './SideBarNav';
function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';

  return pathname === href || pathname.startsWith(`${href}/`);
}

function pickKeyByPath<T extends readonly { key: string; href: string }[]>(
  items: T,
  pathname: string,
) {
  const sorted = [...items].sort((a, b) => b.href.length - a.href.length);
  return sorted.find((it) => matchPathname(pathname, it.href))?.key;
}
export function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarSelected = (pickKeyByPath(SIDEBAR_ITEMS, pathname) ??
    'home') as SidebarKey;

  const bottomSelected = (pickKeyByPath(BOTTOM_NAV_ITEMS, pathname) ??
    'home') as BottomNavKey;

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarNav selected={sidebarSelected} />
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 pb-14 xl:pb-0">
        {children}
      </main>

      <div className="md:hidden">
        <BottomNav selected={bottomSelected} />
      </div>
    </div>
  );
}
