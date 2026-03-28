'use client';

import { useState, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { Dialog, mergeStyles } from '@causw/cds';

import { PostWriteForm, PostEditForm } from '@/features/post-write';

import { useBreakpoint } from '@/shared/hooks';
import { ConfirmModal, SuspenseView } from '@/shared/ui';

export const PostWriteModal = ({ postId }: { postId?: string }) => {
  const router = useRouter();

  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  const { isMobileSize } = useBreakpoint();

  const handleRequestClose = (isDirty: boolean) => {
    if (isDirty) {
      setIsCancelConfirmOpen(true);
    } else {
      router.back();
    }
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
              <PostEditForm postId={postId} onClose={handleRequestClose} />
            </Suspense>
          ) : (
            <PostWriteForm onClose={handleRequestClose} />
          )}
        </Dialog.Content>
      </Dialog>

      <ConfirmModal
        title={
          postId ? '게시글 수정을 그만두시겠어요?' : '글쓰기를 그만두시겠어요?'
        }
        open={isCancelConfirmOpen}
        onOpenChange={setIsCancelConfirmOpen}
        onConfirm={() => router.back()}
        titleTypo="subtitle-16-bold"
      />
    </>
  );
};
