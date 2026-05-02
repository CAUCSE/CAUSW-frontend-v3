'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postQueryKeys } from '@/entities/post';

import { toast } from '@/shared/model';

import { deletePost } from '../../api';

export const useDeletePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });

      toast.success('게시글이 삭제되었어요.');
      router.replace('/feed');
    },
    onError: (error) => {
      toast.error('게시글 삭제에 실패했어요.');
      console.error(error);
    },
  });
};
