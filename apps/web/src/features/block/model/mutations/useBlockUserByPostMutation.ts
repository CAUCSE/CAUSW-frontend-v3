'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { BOARD_GROUP, type BoardGroup } from '@/entities/board';

import { ROUTES } from '@/shared/constants';
import { toast } from '@/shared/model';

import { blockUserByPost } from '../../api';

interface BlockUserByPostVariables {
  postId: string;
  boardGroup: BoardGroup;
}

export const useBlockUserByPostMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ postId }: BlockUserByPostVariables) =>
      blockUserByPost(postId),

    onSuccess: (_data, { boardGroup }) => {
      toast.success('작성자를 차단했어요.');
      router.push(
        boardGroup === BOARD_GROUP.COMMUNITY ? ROUTES.COMMUNITY : ROUTES.FEED,
      );
    },

    onError: () => {
      toast.error('작성자 차단에 실패했어요.');
    },
  });
};
