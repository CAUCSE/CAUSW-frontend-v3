import { useMutation } from '@tanstack/react-query';

import { MESSAGE } from '@/shared/constants';
import { toast } from '@/shared/model';

import { updateFCMToken } from '../../api/post';
import { UpdateFCMTokenRequestDto } from '../types';

export const useUpdateFCMToken = (withToast: boolean = true) => {
  return useMutation({
    mutationFn: (payload: UpdateFCMTokenRequestDto) => updateFCMToken(payload),

    onSuccess: () => {
      if (withToast) {
        toast.success(MESSAGE.PUSH_NOTIFIACTION_SUCCESS);
      }
    },

    onError: (e) => {
      ///삭제!!!!
      console.log('[FCM] update token API failed', e);
      toast.error('22222222');
      if (withToast) {
        toast.error(MESSAGE.PUSH_NOTIFIACTION_FAILURE);
      }
    },
  });
};
