import { useMutation, useQueryClient } from '@tanstack/react-query';

import { unlinkSocialAccount } from '../../api';
import { authQueryKey } from '../../config';

export const useUnlinkSocialAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlinkSocialAccount,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKey.socialAccountStatus(),
      });
    },
  });
};
