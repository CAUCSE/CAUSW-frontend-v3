'use client';

import { useMemo, useRef, useState } from 'react';

import { Box, Dialog, VStack } from '@causw/cds';

import { VoteWriteValue } from '@/entities/post';

import { ImageUploadField, ImageUploadFieldRef } from '@/shared/ui';

import { PostWriteBody } from './PostWriteBody';
import { PostWriteFooter } from './PostWriteFooter';
import { PostWriteHeader } from './PostWriteHeader';

interface PostWriteFormProps {
  isSubmitActive: boolean;
  onClose: () => void;
  onSelectorClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedCategory: string | null;
  content: string;
  setContent: (content: string) => void;
}

const createEmptyPoll = (): VoteWriteValue => ({
  options: [
    { id: crypto.randomUUID(), value: '' },
    { id: crypto.randomUUID(), value: '' },
  ],
  endTime: new Date(),
  allowMultiple: false,
});

export const PostWriteForm = ({
  isSubmitActive,
  onClose,
  onSelectorClick,
  selectedCategory,
  content,
  setContent,
}: PostWriteFormProps) => {
  const imageUploadRef = useRef<ImageUploadFieldRef>(null);

  const [vote, setVote] = useState<VoteWriteValue | null>(null);

  const isVoteValid = useMemo(() => {
    if (!vote) return true;

    const validOptionsCount = vote.options.filter(
      (opt) => opt.value.trim().length > 0,
    ).length;

    return validOptionsCount >= 2;
  }, [vote]);

  return (
    <VStack gap="none" className="h-full">
      <PostWriteHeader
        isSubmitActive={isSubmitActive && isVoteValid}
        onBack={onClose}
      />

      <Dialog.Title className="sr-only">게시글 작성</Dialog.Title>
      <PostWriteBody
        onSelectorClick={onSelectorClick}
        selectedCategory={selectedCategory}
        content={content}
        setContent={setContent}
        vote={vote}
        setVote={setVote}
      />

      <Box className="m-5 mb-0">
        <ImageUploadField
          ref={imageUploadRef}
          name="images"
          setValue={() => {}}
          showMainBadge
        />
      </Box>

      <Dialog.Footer>
        <PostWriteFooter
          onClickPhoto={() => imageUploadRef.current?.openFilePicker()}
          onClickVote={() => {
            if (!vote) {
              setVote(createEmptyPoll());
            }
          }}
        />
      </Dialog.Footer>
    </VStack>
  );
};
