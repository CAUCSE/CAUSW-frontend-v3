'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  postKeys,
  PostUpdateRequestDto,
  PostUpdateResponseDto,
} from '@/entities/post';

import { toast } from '@/shared/model';

import { updatePost } from '../../api';

interface UpdatePostParams {
  postId: string;
  postUpdateRequest: PostUpdateRequestDto;
  attachImageList?: File[];
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      postId,
      postUpdateRequest,
      attachImageList,
    }: UpdatePostParams) =>
      updatePost(postId, postUpdateRequest, attachImageList),
    onSuccess: (data: PostUpdateResponseDto) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(data.id) });

      router.back();
    },
    onError: (error) => {
      toast.error('게시글 수정에 실패했어요.');
      console.error(error);
    },
  });
};
