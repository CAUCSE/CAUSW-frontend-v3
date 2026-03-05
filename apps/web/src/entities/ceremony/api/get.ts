import { API } from '@/shared/api';
import { withQuery } from '@/shared/utils';

import { CeremonyTypeApi, CeremonyUpcomingResponseDto } from '../model/types';

import { formatUpcomingCeremoniesParams } from './formatter';

export const getUpcomingCeremonies = async (
  type: CeremonyTypeApi = 'ALL',
  pageNum: number = 0,
): Promise<CeremonyUpcomingResponseDto> => {
  const queryString = formatUpcomingCeremoniesParams(type, pageNum);
  const url = withQuery('/api/v2/ceremonies/upcoming', queryString);

  return await API.get<CeremonyUpcomingResponseDto>(url);
};
