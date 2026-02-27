import { API } from '@/shared/api';

import { CeremonyTypeApi, CeremonyUpcomingResponseDto } from '../model/types';

export const getUpcomingCeremonies = async (
  type: CeremonyTypeApi = 'ALL',
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
