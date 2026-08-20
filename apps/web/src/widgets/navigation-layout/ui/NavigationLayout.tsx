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
    <div className="flex h-screen md:h-auto md:min-h-screen">
      {/* Desktop Sidebar - 레이아웃 폭만 차지하는 spacer (실제 사이드바는 fixed로 별도 렌더링) */}
      <div className="hidden md:block md:w-65 md:shrink-0" />
      <div className="hidden md:fixed md:top-0 md:left-0 md:block md:h-screen">
        <SidebarNav selected={sidebarSelected} />
      </div>

      {/* Content */}
      <main
        id="main-scroll-container"
        className={mergeStyles(
          'min-h-0 flex-1 overflow-y-auto overscroll-y-contain md:overflow-visible md:overscroll-auto',
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
