'use client';

import React from 'react';

import type { NavKey } from '../model/types';

import { BottomNav } from './BottomNav';
import { SidebarNav } from './SideBarNav';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState<NavKey>('home');
  const [selected, setSelected] = React.useState<NavKey>('home');

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden xl:block">
        <SidebarNav selected={active} onSelectChange={setActive} />
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 pb-14 xl:pb-0">
        {children}
      </main>

      {/* Mobile BottomNav */}
      <div className="xl:hidden">
        {' '}
        <BottomNav selected={selected} onSelectChange={setSelected} />
      </div>
    </div>
  );
}
