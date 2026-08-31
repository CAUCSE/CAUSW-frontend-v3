import { API } from '@/shared/api';

import { SYSTEM_NOTICES_END_POINT_PREFIX } from '../config';
import { type GetSystemNoticeResponseDto } from '../model';

export const getSystemNoticeLatest =
  async (): Promise<GetSystemNoticeResponseDto> => {
    const data = await API.get<GetSystemNoticeResponseDto>(
      `${SYSTEM_NOTICES_END_POINT_PREFIX}/latest`,
    );
    return data;
  };
