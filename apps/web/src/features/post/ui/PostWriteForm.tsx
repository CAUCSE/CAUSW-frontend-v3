'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { FormProvider } from 'react-hook-form';

import { Box, Dialog, VStack } from '@causw/cds';

import { type Board, useGetWritableBoards } from '@/entities/feed';
import {
  type PostCreateFormValues,
  type PostUpdateFormValues,
  usePostCreateForm,
} from '@/entities/post';

import { ImageUploadField, type ImageUploadFieldRef } from '@/shared/ui';

// import { createEmptyVote } from '../lib';
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
  initialImages?: string[];
}

export const PostWriteForm = ({
  onClose,
  postId,
  initialData,
  initialImages = [],
}: PostWriteFormProps) => {
  const isEdit = !!postId;
  const { data: boardData } = useGetWritableBoards();
  const boards = useMemo(() => boardData?.boards ?? [], [boardData?.boards]);

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

  const selectedBoard = boards.find((b) => b.id === currentBoardId) ?? null;

  const onSubmit = async (data: PostCreateFormValues) => {
    const imageData = data.images as {
      existingImages?: string[];
      newImageFiles?: File[];
    };

    const existingImages = imageData?.existingImages ?? [];
    const newImageFiles = imageData?.newImageFiles ?? [];

    if (isEdit) {
      const updateData: PostUpdateFormValues = {
        ...data,
        existingImages,
        newImageFiles,
      };

      const updateDto = mapPostUpdateFormToDto(updateData);

      updatePost({
        postId,
        request: updateDto,
        images: newImageFiles,
      });
    } else {
      const createDto = mapPostCreateFormToDto(data, newImageFiles);

      createPost({
        request: createDto,
        images: newImageFiles,
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

  useEffect(() => {
    if (boards.length === 1 && !currentBoardId) {
      setValue('boardId', boards[0].id, { shouldValidate: true });
    }
  }, [boards, currentBoardId, setValue]);

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
            setValue('content', val, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          vote={currentVote ?? null}
          setVote={(val) =>
            setValue('vote', val, { shouldValidate: true, shouldDirty: true })
          }
          isEdit={isEdit}
          hideBoardSelector={boards.length === 1}
        />

        <Box className="m-5 mb-0">
          <ImageUploadField
            ref={imageUploadRef}
            name="images"
            setValue={setValue}
            showMainBadge
            initialImages={initialImages}
          />
        </Box>

        <Dialog.Footer>
          <PostWriteFooter
            onClickPhoto={() => imageUploadRef.current?.openFilePicker()}
            // TODO: 투표 기능 API 구현/연동 완료 시 주석 해제
            // onClickVote={() => {
            //   if (!currentVote) {
            //     setValue('vote', createEmptyVote(), {
            //       shouldValidate: true,
            //       shouldDirty: true,
            //     });
            //   }
            // }}
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
