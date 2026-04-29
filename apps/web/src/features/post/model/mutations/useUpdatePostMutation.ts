'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postQueryKeys, type PostUpdateRequestDto } from '@/entities/post';

import { toast } from '@/shared/model';

import { updatePost } from '../../api';

interface UpdatePostParams {
  postId: string;
  request: PostUpdateRequestDto;
  images?: File[];
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ postId, request, images }: UpdatePostParams) =>
      updatePost(postId, request, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
      router.back();
    },
    onError: (error) => {
      toast.error('게시글 수정에 실패했어요.');
      console.error(error);
    },
  });
};
