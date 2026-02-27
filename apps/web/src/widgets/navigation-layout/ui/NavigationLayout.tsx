'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { mergeStyles } from '@causw/cds';

import { isBottomNavVisible, pickBottomNavKey, pickSidebarKey } from '../model';

import { BottomNav } from './BottomNav';
import { SidebarNav } from './SideBarNav';
export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const sidebarSelected = pickSidebarKey(pathname);
  const showBottomNav = isBottomNavVisible(pathname);
  const bottomSelected = pickBottomNavKey(pathname);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="tablet:block hidden">
        <SidebarNav selected={sidebarSelected} />
      </div>

      {/* Content */}
      <main
        className={mergeStyles(
          'flex-1 overflow-y-auto bg-gray-100',
          showBottomNav ? 'tablet:mb-0 mb-14' : 'mb-0',
          'flex w-full items-center justify-center',
        )}
      >
        <div className="mx-auto flex h-full w-full flex-col items-center">
          {children}
        </div>
      </main>

      {/* Mobile BottomNav */}
      {showBottomNav && (
        <div className="tablet:hidden">
          <BottomNav selected={bottomSelected} />
        </div>
      )}
    </div>
  );
}
