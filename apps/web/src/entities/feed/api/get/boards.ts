import { API } from '@/shared/api';

import { type BoardAvailableListResponseDto } from '../../model';

export const getAvailableBoards =
  async (): Promise<BoardAvailableListResponseDto> => {
    const data = await API.get<BoardAvailableListResponseDto>(
      '/api/v2/boards/available',
    );

    return data;
  };
