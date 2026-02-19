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
  //테스트를 위한 하드 코딩 -> api연결 후 제거 필요
  //TODO : 알림 개수 api 연결
  const NOTIFICATION_CNT_FOR_TEST = 5;

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="tablet:block hidden">
        <SidebarNav
          selected={sidebarSelected}
          notificationCnt={NOTIFICATION_CNT_FOR_TEST ?? 0}
        />
      </div>

      {/* Content */}
      <main
        className={mergeStyles(
          'flex-1 overflow-y-auto bg-gray-50',
          showBottomNav ? 'tablet:mb-0 mb-14' : 'mb-0',
          'flex w-full justify-center',
        )}
      >
        <div className="max-w-desktop desktop:px-0 w-full">{children}</div>
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
