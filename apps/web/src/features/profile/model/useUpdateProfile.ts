import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyProfile } from '@/entities/profile/api/put';
import { profileQueryKeys } from '@/entities/profile/config/query/profileKeys';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
    onError: (error) => {
      console.error('업데이트 실패:', error);
    },
  });
};
