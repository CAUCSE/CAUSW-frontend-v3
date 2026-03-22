'use client';

import { useRef, useState } from 'react';

import { FormProvider } from 'react-hook-form';

import { Box, Dialog, VStack } from '@causw/cds';

import { Board, useGetAvailableBoards } from '@/entities/feed';
import { PostCreateFormValues, usePostCreateForm } from '@/entities/post';

import { ImageUploadField, ImageUploadFieldRef } from '@/shared/ui';

import { createEmptyVote } from '../lib';
import { mapPostCreateFormToDto, mapPostUpdateFormToDto } from '../lib/mappers';
import { useCreatePostMutation, useUpdatePostMutation } from '../model';

import { PostBoardSelector } from './PostBoardSelector';
import { PostWriteBody } from './PostWriteBody';
import { PostWriteFooter } from './PostWriteFooter';
import { PostWriteHeader } from './PostWriteHeader';

interface PostWriteFormProps {
  onClose: (isDirty: boolean) => void;
  postId?: string;
  initialData?: Partial<PostCreateFormValues>;
}

export const PostWriteForm = ({
  onClose,
  postId,
  initialData,
}: PostWriteFormProps) => {
  const { data: boardData } = useGetAvailableBoards();

  const form = usePostCreateForm(initialData);
  const { mutate: createPost } = useCreatePostMutation();
  const { mutate: updatePost } = useUpdatePostMutation();

  const {
    handleSubmit,
    formState: { isValid, isDirty },
    watch,
    setValue,
  } = form;

  const currentContent = watch('content');
  const isAnonymous = watch('isAnonymous');
  const currentBoardId = watch('boardId');
  const currentVote = watch('vote');

  const imageUploadRef = useRef<ImageUploadFieldRef>(null);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedBoard =
    boardData?.boards.find((b) => b.id === currentBoardId) ?? null;

  const onSubmit = async (data: PostCreateFormValues) => {
    if (postId) {
      const updateDto = mapPostUpdateFormToDto(data);

      updatePost({
        postId,
        postUpdateRequest: updateDto,
        attachImageList: data.images,
      });
    } else {
      const createDto = mapPostCreateFormToDto(data);

      createPost({
        postCreateRequest: createDto,
        attachImageList: data.images,
      });
    }
  };

  const handleBoardSelect = (board: Board) => {
    setValue('boardId', board.id, { shouldValidate: true, shouldDirty: true });
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
        <PostWriteHeader isSubmitActive={isValid} onBack={handleBack} />

        <PostWriteBody
          onSelectorClick={() => setSelectorOpen(true)}
          selectedBoard={selectedBoard}
          content={currentContent}
          setContent={(val) =>
            setValue('content', val, { shouldValidate: true })
          }
          vote={currentVote ?? null}
          setVote={(val) =>
            setValue('vote', val, { shouldValidate: true, shouldDirty: true })
          }
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
              if (!currentVote) {
                setValue('vote', createEmptyVote(), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
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
