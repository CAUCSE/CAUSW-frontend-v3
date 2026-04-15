import { useMutation } from '@tanstack/react-query';

import { updateFCMToken } from '@/entities/notification';
import { type UpdateFCMTokenRequestDto } from '@/entities/notification/';

import { MESSAGE } from '@/shared/constants';
import { toast } from '@/shared/model';

export const useUpdateFCMToken = () => {
  return useMutation({
    mutationFn: (payload: UpdateFCMTokenRequestDto) => updateFCMToken(payload),

    onError: () => {
      toast.error(MESSAGE.PUSH_NOTIFICATION.TOKEN_UPDATE_FAILURE);
    },
  });
};
