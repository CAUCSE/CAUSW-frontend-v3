import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyProfile } from '@/entities/profile/api/put';
import { profileQueryKeys } from '@/entities/profile/config/query/profileKeys';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
      console.log('프로필이 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('업데이트 실패:', error);
    },
  });
};
