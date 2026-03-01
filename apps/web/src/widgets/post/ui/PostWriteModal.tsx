'use client';

import { useRouter } from 'next/navigation';

import { Dialog, mergeStyles } from '@causw/cds';

import {
  PostCategorySelector,
  PostWriteForm,
  usePostWrite,
} from '@/features/post-write';

import { useBreakpoint } from '@/shared/hooks';
import { ConfirmLeaveModal } from '@/shared/ui';

export const PostWriteModal = () => {
  const router = useRouter();

  const { isMobileSize } = useBreakpoint();

  const {
    isCategoryOpen,
    setIsCategoryOpen,
    selectedCategory,
    setSelectedCategory,
    content,
    setContent,
    isCancelConfirmOpen,
    setIsCancelConfirmOpen,
    isSubmitActive,
  } = usePostWrite();

  const handleCategorySelectorClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.currentTarget.blur();
    setIsCategoryOpen(true);
  };

  const handleRequestClose = () => {
    if (content.trim().length > 0 || selectedCategory !== null) {
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
          if (!open) handleRequestClose();
        }}
      >
        <Dialog.Content
          aria-describedby={undefined}
          fullscreen={isMobileSize}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            handleRequestClose();
          }}
          className={mergeStyles(
            'p-0 md:overflow-hidden',
            !isMobileSize ? 'w-[calc(100vw-200px)] max-w-175 md:h-120' : '',
          )}
        >
          <PostWriteForm
            isSubmitActive={isSubmitActive}
            onClose={handleRequestClose}
            onSelectorClick={handleCategorySelectorClick}
            selectedCategory={selectedCategory}
            content={content}
            setContent={setContent}
          />
        </Dialog.Content>
      </Dialog>

      <PostCategorySelector
        open={isCategoryOpen}
        onOpenChange={setIsCategoryOpen}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ConfirmLeaveModal
        message="글쓰기를 그만두시겠어요?"
        open={isCancelConfirmOpen}
        setOpen={setIsCancelConfirmOpen}
      />
    </>
  );
};
