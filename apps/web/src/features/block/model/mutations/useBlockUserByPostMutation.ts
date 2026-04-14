'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast } from '@/shared/model';

import { blockUserByPost } from '../../api';

export const useBlockUserByPostMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (postId: string) => blockUserByPost(postId),

    onSuccess: () => {
      toast.success('작성자를 차단했어요.');
      router.push('/feed');
    },

    onError: () => {
      toast.error('작성자 차단에 실패했어요.');
    },
  });
};
