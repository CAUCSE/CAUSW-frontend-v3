import { useMutation } from '@tanstack/react-query';

import { MESSAGE } from '@/shared/constants';
import { toast } from '@/shared/model';

import { updateFCMToken } from '../../../../entities/notification/api/post';
import { UpdateFCMTokenRequestDto } from '../../../../entities/notification/model/types';

export const useUpdateFCMToken = () => {
  return useMutation({
    mutationFn: (payload: UpdateFCMTokenRequestDto) => updateFCMToken(payload),

    onError: () => {
      toast.error(MESSAGE.PUSH_NOTIFICATION.TOKEN_UPDATE_FAILURE);
    },
  });
};
