import { API } from '@/shared/api';

import { type GetAvailableBoardListResponseDto } from '../model';

export const getAvailableBoards = async () => {
  const response = await API.get<GetAvailableBoardListResponseDto>(
    '/api/v2/boards/available',
  );
  return response;
};
