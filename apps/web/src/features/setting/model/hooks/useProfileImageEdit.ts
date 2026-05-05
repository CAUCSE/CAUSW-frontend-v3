import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { authQueryKey, type UserResponseDto } from '@/entities/auth';

import { PROFILE_IMAGE_ACTION_MODE } from '@/shared/constants';
import {
  isCustomProfileImageType,
  isDefaultProfileImageType,
} from '@/shared/lib/profile-image';
import type { ProfileImageEditValue } from '@/shared/types';

import { useChangeMyProfileImageMutation } from '../mutations';

interface UseProfileImageEditParams {
  myInfo?: UserResponseDto;
  onSuccess?: () => void | Promise<void>;
}

export const useProfileImageEdit = ({
  myInfo,
  onSuccess,
}: UseProfileImageEditParams) => {
  const queryClient = useQueryClient();

  const currentProfileImage = useMemo<ProfileImageEditValue>(
    () => ({
      profileImageType: myInfo?.profileImage.profileImageType ?? 'GHOST',
      profileImageUrl: myInfo?.profileImage.profileImageUrl ?? null,
    }),
    [myInfo],
  );

  const changeMyProfileImageMutation = useChangeMyProfileImageMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKey.me(),
      });
      await onSuccess?.();
    },
  });

  const handleSubmitProfileImage = async (value: ProfileImageEditValue) => {
    if (isCustomProfileImageType(value.profileImageType)) {
      if (!value.customImageFile) {
        return;
      }

      await changeMyProfileImageMutation.mutateAsync({
        mode: PROFILE_IMAGE_ACTION_MODE.CUSTOM,
        image: value.customImageFile,
      });
    } else if (isDefaultProfileImageType(value.profileImageType)) {
      await changeMyProfileImageMutation.mutateAsync({
        mode: PROFILE_IMAGE_ACTION_MODE.DEFAULT,
        profileImageType: value.profileImageType,
      });
    }
  };

  return {
    currentProfileImage,
    handleSubmitProfileImage,
  };
};
