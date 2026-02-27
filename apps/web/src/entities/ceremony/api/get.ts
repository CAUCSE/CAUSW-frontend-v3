import { API } from '@/shared/api';

import { CeremonyType, CeremonyUpcomingResponseDto } from '../model/types';

export const getUpcomingCeremonies = async (
  type: CeremonyType = 'all',
  pageNum: number = 0,
): Promise<CeremonyUpcomingResponseDto> => {
  const queryString = new URLSearchParams({
    type,
    pageNum: String(pageNum),
  }).toString();

  return await API.get<CeremonyUpcomingResponseDto>(
    `/api/v2/ceremonies/upcoming?${queryString}`,
  );
};
