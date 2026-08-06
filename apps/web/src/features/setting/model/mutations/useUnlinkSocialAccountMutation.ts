import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authQueryKey } from '@/entities/auth';

import { toast } from '@/shared/model';
import { extractErrorMessage } from '@/shared/utils';

import { unlinkAccount } from '../../api/delete/unlinkAccount';

export const useUnlinkSocialAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlinkAccount,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKey.socialAccountStatus(),
      });

      toast.success('소셜 계정 연동이 해제되었습니다.');
    },

    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '소셜 계정 연동 해제에 실패했습니다. 다시 시도해주세요.',
        ),
      );
    },
  });
};
