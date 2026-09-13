'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { mergeStyles } from '@causw/cds';

import { ROUTES } from '@/shared/constants';

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
  // my-feed는 하단 네비는 없지만 페이지 자신이 풀 높이 스크롤 컨테이너를 구성하므로,
  // main이 아니라 MyFeedList 안쪽에서 safe-area 여백을 처리한다.
  const managesOwnBottomInset = showBottomNav || pathname === ROUTES.MY_FEED;

  return (
    <div className="flex h-screen md:h-auto md:min-h-screen">
      {/* Desktop Sidebar - 레이아웃 폭만 차지하는 spacer (실제 사이드바는 fixed로 별도 렌더링, CDS Sidebar 폭 64px) */}
      <div className="hidden md:block md:w-16 md:shrink-0" />
      <div className="hidden md:fixed md:top-0 md:left-0 md:block md:h-screen">
        <SidebarNav selected={sidebarSelected} />
      </div>

      {/* Content */}
      <main
        id="main-scroll-container"
        className={mergeStyles(
          'min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain md:overflow-visible md:overscroll-auto',
          grayBackground ? 'bg-gray-100' : 'bg-white',
          // 자체 스크롤 컨테이너를 갖는 페이지(하단 네비 페이지, my-feed 등)는
          // 여백을 main이 아니라 각 페이지의 스크롤 콘텐츠 끝에 둔다
          // (하단 네비 페이지는 --mobile-nav-clearance, 그 외에는 --safe-area-inset-bottom)
          managesOwnBottomInset
            ? 'pb-0'
            : 'pb-(--safe-area-inset-bottom) md:pb-0',
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
