'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FormProvider } from 'react-hook-form';

import { Box, Dialog, VStack } from '@causw/cds';

import { BOARD_GROUP, type Board, useGetWritableBoards } from '@/entities/feed';
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

declare global {
  interface Window {
    __androidBackHandler?: () => boolean;
    __postWriteConfirmBack?: () => void;
  }
}

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
  const { data: boardData } = useGetWritableBoards({
    boardGroup: BOARD_GROUP.NOTICE,
  });
  const boards = useMemo(() => boardData?.boards ?? [], [boardData?.boards]);

  const form = usePostCreateForm(initialData);
  const { mutate: createPost, isPending: isCreatePostPending } =
    useCreatePostMutation();
  const { mutate: updatePost, isPending: isUpdatePostPending } =
    useUpdatePostMutation();

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

      if (isUpdatePostPending) {
        return;
      }

      updatePost({
        postId,
        request: updateDto,
        images: newImageFiles,
      });
    } else {
      const createDto = mapPostCreateFormToDto(data, newImageFiles);

      if (isCreatePostPending) {
        return;
      }

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

  const handleBack = useCallback(() => {
    if (selectorOpen) {
      setSelectorOpen(false);
    } else {
      onClose(isDirty);
    }
  }, [selectorOpen, isDirty, onClose]);

  useEffect(() => {
    const allowBackRef = { current: false };

    // 브라우저 뒤로가기를 감지하기 위한 guard history 생성
    // React StrictMode에서 effect가 두 번 실행되어도 중복 생성되지 않도록 체크
    if (!window.history.state?.postWriteGuard) {
      window.history.pushState(
        {
          ...window.history.state,
          postWriteGuard: true,
        },
        '',
        window.location.href,
      );
    }

    const handleBrowserBack = () => {
      // 사용자가 모달에서 실제로 나가기를 선택한 경우
      if (allowBackRef.current) {
        allowBackRef.current = false;
        return;
      }

      // 브라우저 뒤로가기로 빠져나가지 않도록 guard 복구
      window.history.pushState(
        {
          ...window.history.state,
          postWriteGuard: true,
        },
        '',
        window.location.href,
      );

      handleBack();
    };

    // Android 하드웨어 뒤로가기
    window.__androidBackHandler = () => {
      handleBack();
      return true;
    };

    // 실제로 글쓰기 페이지를 빠져나갈 때 사용
    window.__postWriteConfirmBack = () => {
      allowBackRef.current = true;

      window.history.go(-2);
    };

    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);

      delete window.__androidBackHandler;
      delete window.__postWriteConfirmBack;
    };
  }, [handleBack]);

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
