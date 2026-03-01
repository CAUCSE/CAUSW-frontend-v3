import { CeremonyTypeApi } from '../model/types/types';

export const formatUpcomingCeremoniesParams = (
  type: CeremonyTypeApi = 'ALL',
  pageNum: number = 0,
): string => {
  return new URLSearchParams({
    type,
    pageNum: String(pageNum),
  }).toString();
};
