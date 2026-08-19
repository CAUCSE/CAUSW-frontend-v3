'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { mergeStyles } from '@causw/cds';

import {
  isBottomNavVisible,
  isGrayBackgroundPage,
  pickBottomNavKey,
  pickSidebarKey,
} from '../model';

import { BottomNav } from './BottomNav';
import { SidebarNav } from './sidebar';
export function NavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const sidebarSelected = pickSidebarKey(pathname);
  const showBottomNav = isBottomNavVisible(pathname);
  const bottomSelected = pickBottomNavKey(pathname);
  const grayBackground = isGrayBackgroundPage(pathname);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="tablet:block hidden">
        <SidebarNav selected={sidebarSelected} />
      </div>

      {/* Content */}
      <main
        id="main-scroll-container"
        className={mergeStyles(
          'min-h-0 flex-1 overflow-y-auto overscroll-y-contain',
          grayBackground ? 'bg-gray-100' : 'bg-white',
          showBottomNav ? 'pb-14 md:pb-0' : 'pb-0',
        )}
      >
        {children}
      </main>

      {/* Mobile BottomNav */}
      {showBottomNav && (
        <div className="md:hidden">
          <BottomNav selected={bottomSelected} />
        </div>
      )}
    </div>
  );
}
