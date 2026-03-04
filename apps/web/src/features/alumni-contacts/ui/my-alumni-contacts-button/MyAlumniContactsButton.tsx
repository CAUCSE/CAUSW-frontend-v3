'use client';

import { useRouter } from 'next/navigation';

import { ChevronRight, FloatingActionButton, Text } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks';

export const MyAlumniContactsButton = () => {
  const { isMobileSize } = useBreakpoint();
  const router = useRouter();

  const handleClick = () => {
    router.push('/profile');
  };

  if (!isMobileSize) {
    return null;
  }
  return (
    <FloatingActionButton
      className="fixed right-4 bottom-18.5 items-center gap-1 border border-gray-200 bg-gray-50 shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.04)]"
      onClick={handleClick}
    >
      <Text typography="subtitle-16-bold" className="text-gray-500">
        내 동문수첩
      </Text>
      <ChevronRight size={14} color="gray-500" />
    </FloatingActionButton>
  );
};
