'use client';

import { useMemo, useRef, useState } from 'react';

import { FormProvider } from 'react-hook-form';

import { Box, Dialog, VStack } from '@causw/cds';

import { Board, useGetAvailableBoards } from '@/entities/feed';
import {
  PostCreateFormValues,
  usePostCreateForm,
  VoteWriteValue,
} from '@/entities/post';

import { ImageUploadField, ImageUploadFieldRef } from '@/shared/ui';

import { createEmptyVote } from '../lib';

import { PostBoardSelector } from './PostBoardSelector';
import { PostWriteBody } from './PostWriteBody';
import { PostWriteFooter } from './PostWriteFooter';
import { PostWriteHeader } from './PostWriteHeader';

interface PostWriteFormProps {
  onClose: (isDirty: boolean) => void;
}

export const PostWriteForm = ({ onClose }: PostWriteFormProps) => {
  const { data: boardData } = useGetAvailableBoards();

  const form = usePostCreateForm();

  const {
    handleSubmit,
    formState: { isValid, isDirty },
    watch,
    setValue,
  } = form;

  const currentContent = watch('content');
  const isAnonymous = watch('isAnonymous');

  const imageUploadRef = useRef<ImageUploadFieldRef>(null);

  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const [vote, setVote] = useState<VoteWriteValue | null>(null);

  const onSubmit = async (data: PostCreateFormValues) => {
    if (!selectedBoard) return;
    console.log(data);
  };

  const isVoteValid = useMemo(() => {
    if (!vote) return true;
    const validOptionsCount = vote.options.filter(
      (opt) => opt.value.trim().length > 0,
    ).length;
    return validOptionsCount >= 2;
  }, [vote]);

  const handleBoardSelect = (board: Board) => {
    setSelectedBoard(board);
    setSelectorOpen(false);
  };

  const handleBack = () => {
    if (selectorOpen) {
      setSelectorOpen(false);
    } else {
      onClose(isDirty);
    }
  };

  return (
    <FormProvider {...form}>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        gap="none"
        className="h-full"
      >
        <PostWriteHeader
          isSubmitActive={isValid && isVoteValid}
          onBack={handleBack}
        />

        <Dialog.Title className="sr-only">게시글 작성</Dialog.Title>
        <PostWriteBody
          onSelectorClick={() => setSelectorOpen(true)}
          selectedBoard={selectedBoard}
          content={currentContent}
          setContent={(val) =>
            setValue('content', val, { shouldValidate: true })
          }
          vote={vote}
          setVote={setVote}
        />

        <Box className="m-5 mb-0">
          <ImageUploadField
            ref={imageUploadRef}
            name="images"
            setValue={setValue}
            showMainBadge
          />
        </Box>

        <Dialog.Footer>
          <PostWriteFooter
            onClickPhoto={() => imageUploadRef.current?.openFilePicker()}
            onClickVote={() => {
              if (!vote) {
                setVote(createEmptyVote());
              }
            }}
            isAnonymous={isAnonymous}
            onChangeAnonymous={(val) =>
              setValue('isAnonymous', val, { shouldDirty: true })
            }
          />
        </Dialog.Footer>
      </VStack>

      <PostBoardSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        selectedBoard={selectedBoard}
        onSelectBoard={handleBoardSelect}
        boards={boardData?.boards ?? []}
      />
    </FormProvider>
  );
};
