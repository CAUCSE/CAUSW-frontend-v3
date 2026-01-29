'use client';

import React from 'react';

import clsx from 'clsx';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full">
        {/* Desktop sidebar */}
        <aside className="hidden h-full w-65 shrink-0 xl:block">sidebar</aside>

        {/* Main content */}
        <main className={clsx('flex-1 overflow-y-auto', 'pb-16 xl:pb-0')}>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 xl:hidden">
        bottom nav
      </nav>
    </div>
  );
}
