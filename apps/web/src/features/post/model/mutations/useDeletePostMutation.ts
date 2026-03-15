'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast } from '@/shared/model';

import { deletePost } from '../../api';

export const useDeletePostMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),

    onSuccess: () => {
      toast.success('게시글이 삭제되었어요.');

      // TODO: 게시글 삭제 후 invalidateQueries
      //   queryClient.invalidateQueries({
      //     queryKey: ['feed'],
      //   });

      router.replace('/feed');
    },

    onError: () => {
      toast.error('게시긆 삭제에 실패했어요.');
    },
  });
};
