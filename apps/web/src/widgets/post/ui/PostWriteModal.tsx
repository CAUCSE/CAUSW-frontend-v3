'use client';

import { useState, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { Dialog, mergeStyles } from '@causw/cds';

import { PostEditForm, PostWriteForm } from '@/features/post';

import { type BoardGroup } from '@/entities/board';

import { confirmNativeBackGuard, useBreakpoint } from '@/shared/hooks';
import { ConfirmModal, SuspenseView } from '@/shared/ui';

interface PostWriteModalProps {
  boardGroup: BoardGroup;
  postId?: string;
}

export const PostWriteModal = ({ boardGroup, postId }: PostWriteModalProps) => {
  const router = useRouter();

  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  const { isMobileSize } = useBreakpoint();

  const handleRequestClose = (isDirty: boolean) => {
    if (isDirty) {
      setIsCancelConfirmOpen(true);
    } else {
      closePostWrite();
    }
  };

  const closePostWrite = () => {
    confirmNativeBackGuard(() => router.back());
  };

  return (
    <>
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) setIsCancelConfirmOpen(true);
        }}
      >
        <Dialog.Content
          aria-describedby={undefined}
          fullscreen={isMobileSize}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            setIsCancelConfirmOpen(true);
          }}
          className={mergeStyles(
            'flex flex-col p-0 focus:outline-none md:overflow-hidden',
            !isMobileSize
              ? 'w-[calc(100vw-200px)] max-w-175 md:h-128'
              : 'animate-none! transition-none! data-[state=closed]:animate-none! data-[state=open]:animate-none!',
          )}
        >
          <Dialog.Title className="sr-only">
            {postId ? '게시글 수정' : '게시글 작성'}
          </Dialog.Title>
          {postId ? (
            <Suspense fallback={<SuspenseView />}>
              <PostEditForm
                postId={postId}
                boardGroup={boardGroup}
                onClose={handleRequestClose}
              />
            </Suspense>
          ) : (
            <Suspense fallback={<SuspenseView />}>
              <PostWriteForm
                boardGroup={boardGroup}
                onClose={handleRequestClose}
              />
            </Suspense>
          )}
        </Dialog.Content>
      </Dialog>

      <ConfirmModal
        title={
          postId ? '게시글 수정을 그만두시겠어요?' : '글쓰기를 그만두시겠어요?'
        }
        open={isCancelConfirmOpen}
        onOpenChange={setIsCancelConfirmOpen}
        onConfirm={closePostWrite}
        titleTypo="subtitle-16-bold"
      />
    </>
  );
};
