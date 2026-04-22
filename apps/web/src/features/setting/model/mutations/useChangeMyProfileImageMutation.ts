import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import {
  changeMyCustomProfileImage,
  changeMyDefaultProfileImage,
} from '@/features/setting/api';

import { PROFILE_IMAGE_ACTION_MODE } from '@/shared/constants';
import { toast } from '@/shared/model';
import type { ChangeMyProfileImageRequest } from '@/shared/types';
import { extractErrorMessage } from '@/shared/utils';

type ChangeMyProfileImageMutationOptions = Omit<
  UseMutationOptions<null, Error, ChangeMyProfileImageRequest>,
  'mutationFn' | 'onMutate' | 'onSuccess' | 'onError'
> & {
  onSuccess?: () => void | Promise<void>;
};

export const useChangeMyProfileImageMutation = (
  options?: ChangeMyProfileImageMutationOptions,
) => {
  const { onSuccess: afterSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: (data: ChangeMyProfileImageRequest) => {
      if (data.mode === PROFILE_IMAGE_ACTION_MODE.DEFAULT) {
        return changeMyDefaultProfileImage({
          profileImageType: data.profileImageType,
        });
      }

      return changeMyCustomProfileImage(data.image);
    },
    onMutate: () => {
      toast.loading('프로필 이미지를 변경하고 있어요...');
    },
    onSuccess: async () => {
      toast.success('프로필 이미지가 변경되었습니다.');
      await afterSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          '프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.',
        ),
      );
    },
    ...restOptions,
  });
};
