import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyProfile } from '@/entities/profile/api/put';
import { profileQueryKeys } from '@/entities/profile/config/query/profileKeys';

import { toast } from '@/shared/model';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
      toast.success('프로필 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      toast.error('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
      console.error('[Profile Update Error]:', error);
    },
  });
};
