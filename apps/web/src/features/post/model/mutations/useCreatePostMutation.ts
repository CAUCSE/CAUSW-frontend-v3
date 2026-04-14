'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import {
  type PostCreateRequestDto,
  type PostCreateResponseDto,
} from '@/entities/post';

import { toast } from '@/shared/model';

import { createPost } from '../../api';

interface CreatePostParams {
  postCreateRequest: PostCreateRequestDto;
  attachImageList: File[];
}

export const useCreatePostMutation = () => {
  const router = useRouter();

  return useMutation<PostCreateResponseDto, Error, CreatePostParams>({
    mutationFn: ({ postCreateRequest, attachImageList }) =>
      createPost(postCreateRequest, attachImageList),

    onSuccess: () => {
      toast.success('게시글이 작성되었어요.');

      // TODO: 작성 후 게시글 목록 invalidateQueries 필요
      // queryClient.invalidateQueries({
      //   queryKey: ['feed'],
      // });

      router.back();
      setTimeout(() => {
        router.replace('/feed');
      }, 0);
    },

    onError: () => {
      toast.error('게시글 작성에 실패했어요.');
    },
  });
};
