'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Dialog, mergeStyles } from '@causw/cds';

import { PostWriteForm } from '@/features/post-write';

import { useBreakpoint } from '@/shared/hooks';
import { ConfirmLeaveModal } from '@/shared/ui';

export const PostWriteModal = () => {
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
            'flex flex-col p-0 md:overflow-hidden',
            !isMobileSize ? 'w-[calc(100vw-200px)] max-w-175 md:h-128' : '',
          )}
        >
          <PostWriteForm onClose={handleRequestClose} />
        </Dialog.Content>
      </Dialog>

      <ConfirmLeaveModal
        message="글쓰기를 그만두시겠어요?"
        open={isCancelConfirmOpen}
        setOpen={setIsCancelConfirmOpen}
      />
    </>
  );
};
