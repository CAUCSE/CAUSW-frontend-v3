import { API } from '@/shared/api';

import {
  type GetWritableBoardListResponseDto,
  type GetAvailableBoardListResponseDto,
} from '../model';

export const getAvailableBoards = async () => {
  const response = await API.get<GetAvailableBoardListResponseDto>(
    '/api/v2/boards/available',
  );
  return response;
};

export const getWritableBoards = async () => {
  const response = await API.get<GetWritableBoardListResponseDto>(
    '/api/v2/boards/writable',
  );
  return response;
};
