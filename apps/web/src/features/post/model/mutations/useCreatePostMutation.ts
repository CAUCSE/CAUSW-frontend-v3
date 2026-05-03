'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  postQueryKeys,
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
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });

      router.back();
      requestAnimationFrame(() => {
        router.push(`/feed/${data.id}`);
      });
    },
    onError: (error) => {
      toast.error('게시글 작성에 실패했어요.');
      console.error(error);
    },
  });
};
