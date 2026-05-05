'use client';

import { useRouter } from 'next/navigation';

import { FloatingActionButton, Plus, Text } from '@causw/cds';

export const PostWriteFloatingActionButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/feed/write');
  };
  return (
    <FloatingActionButton
      className="fixed right-4 bottom-18.5 items-center gap-1 border border-gray-200 bg-gray-50 shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.04)]"
      onClick={handleClick}
    >
      <Plus size={16} color="gray-500" />
      <Text typography="subtitle-16-bold" className="text-gray-500">
        글쓰기
      </Text>
    </FloatingActionButton>
  );
};
