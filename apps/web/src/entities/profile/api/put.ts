import {
  MyProfileResponseDto,
  UpdateMyProfileRequestDto,
} from '@/entities/profile/types/dto/myProfileDto';

import { API } from '@/shared/api';

export const updateMyProfile = async (data: UpdateMyProfileRequestDto) => {
  return await API.put<MyProfileResponseDto>('/api/v2/users-info/me', data);
};
