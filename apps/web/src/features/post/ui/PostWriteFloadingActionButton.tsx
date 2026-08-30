'use client';

import { useRouter } from 'next/navigation';

import { FloatingActionButton, Plus, Text } from '@causw/cds';

import { type BoardGroup } from '@/entities/feed';
import { getPostWritePath } from '@/entities/post';

interface PostWriteFloatingActionButtonProps {
  boardGroup: BoardGroup;
}

export const PostWriteFloatingActionButton = ({
  boardGroup,
}: PostWriteFloatingActionButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(getPostWritePath(boardGroup));
  };
  return (
    <FloatingActionButton
      className="fixed right-4 bottom-18.5 items-center gap-1 border border-gray-200 bg-gray-50 shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.04)] md:right-12 md:bottom-12"
      onClick={handleClick}
    >
      <Plus size={16} color="gray-500" />
      <Text typography="subtitle-16-bold" className="text-gray-500">
        글쓰기
      </Text>
    </FloatingActionButton>
  );
};
