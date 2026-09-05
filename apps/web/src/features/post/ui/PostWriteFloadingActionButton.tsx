'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { FloatingActionButton, Plus, Text } from '@causw/cds';

import { useGetWritableBoards, type BoardGroup } from '@/entities/board';
import { getPostWritePath } from '@/entities/post';

interface PostWriteFloatingActionButtonProps {
  boardGroup: BoardGroup;
}

export const PostWriteFloatingActionButton = (
  props: PostWriteFloatingActionButtonProps,
) => {
  return (
    <Suspense fallback={null}>
      <PostWriteFloatingActionButtonInner {...props} />
    </Suspense>
  );
};

const PostWriteFloatingActionButtonInner = ({
  boardGroup,
}: PostWriteFloatingActionButtonProps) => {
  const router = useRouter();
  const { data } = useGetWritableBoards({ boardGroup });
  const handleClick = () => {
    router.push(getPostWritePath(boardGroup));
  };

  if (!data.boards.length) {
    return null;
  }

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
