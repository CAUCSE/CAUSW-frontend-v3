'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type PostCreateRequestDto,
  type PostCreateResponseDto,
} from '@/entities/post';

import { toast } from '@/shared/model';

import { createPost } from '../../api';

interface CreatePostParams {
  request: PostCreateRequestDto;
  images: File[];
}

export const useCreatePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<PostCreateResponseDto, Error, CreatePostParams>({
    mutationFn: ({ request, images }) => createPost(request, images),

    onSuccess: (data) => {
      toast.success('게시글이 작성되었어요.');

      queryClient.invalidateQueries({
        queryKey: ['feed'],
      });

      router.back();
      setTimeout(() => {
        router.push(`/feed/${data.id}`);
      }, 0);
    },

    onError: () => {
      toast.error('게시글 작성에 실패했어요.');
    },
  });
};
