'use client';

import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#F3F4F6]">
      <div className="flex w-full flex-col md:mt-[24px] md:mb-8 md:max-w-[836px] md:px-8">
        {children}
      </div>
    </div>
  );
};
