'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast } from '@/shared/model';

import { blockUserByReply } from '../../api';

export const useBlockUserByReplyMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (childCommentId: string) => blockUserByReply(childCommentId),

    onSuccess: () => {
      toast.success('작성자를 차단했어요.');
      router.push('/feed');
    },

    onError: () => {
      toast.error('작성자 차단에 실패했어요.');
    },
  });
};
