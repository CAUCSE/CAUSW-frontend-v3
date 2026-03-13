import { MyProfileResponseDto } from '@/entities/profile/types/dto/myProfileDto';

import { API } from '@/shared/api';

export const getMyProfile = async () => {
  return await API.get<MyProfileResponseDto>('/api/v2/users-info/me');
};
