import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  authQueryKey,
  type UserProfileImageType,
  type UserResponseDto,
} from '@/entities/auth';
import type { ProfileImageEditValue } from '@/entities/setting';

import {
  isCustomProfileImageType,
  isDefaultProfileImageType,
} from '@/shared/lib/profile-image';

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
      profileImageType:
        myInfo?.profileImage.profileImageType ??
        ('GHOST' as UserProfileImageType),
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
        mode: 'custom',
        image: value.customImageFile,
      });
    } else {
      if (!isDefaultProfileImageType(value.profileImageType)) {
        return;
      }

      await changeMyProfileImageMutation.mutateAsync({
        mode: 'default',
        profileImageType: value.profileImageType,
      });
    }
  };

  return {
    currentProfileImage,
    handleSubmitProfileImage,
  };
};
