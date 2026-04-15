import type { ChangeDefaultProfileImageRequest } from '@/entities/setting';

import { API } from '@/shared/api';
import { USER_API_PREFIX } from '@/shared/constants';

export const changeMyDefaultProfileImage = async (
  data: ChangeDefaultProfileImageRequest,
) => {
  return API.patch<null>(`${USER_API_PREFIX}/me/profile-image/default`, data);
};

export const changeMyCustomProfileImage = async (image: File) => {
  const formData = new FormData();

  formData.append('image', image);

  return API.patch<null>(
    `${USER_API_PREFIX}/me/profile-image/custom`,
    formData,
  );
};
