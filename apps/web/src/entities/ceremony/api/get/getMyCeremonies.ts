import { API } from '@/shared/api';

import type { CeremonyPageResponse, CeremonyState } from '../../model';

export const getMyCeremonies = (state: CeremonyState, pageNum: number) => {
  const params = new URLSearchParams();
  params.set('state', state);
  params.set('pageNum', String(pageNum));

  return API.get<CeremonyPageResponse>(
    `/api/v2/ceremonies/my?${params.toString()}`,
  );
};
