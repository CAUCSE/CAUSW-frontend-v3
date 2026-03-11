import { API } from '@/shared/api';

import type { CeremonyFilterTypeApi, CeremonyPageResponse } from '../../model';

const buildParams = (type: CeremonyFilterTypeApi, pageNum: number) => {
  const params = new URLSearchParams();
  params.set('type', type);
  params.set('pageNum', String(pageNum));
  return params.toString();
};

export const getOngoingCeremonies = (
  type: CeremonyFilterTypeApi,
  pageNum: number,
) =>
  API.get<CeremonyPageResponse>(
    `/api/v2/ceremonies/ongoing?${buildParams(type, pageNum)}`,
  );

export const getUpcomingCeremonies = (
  type: CeremonyFilterTypeApi,
  pageNum: number,
) =>
  API.get<CeremonyPageResponse>(
    `/api/v2/ceremonies/upcoming?${buildParams(type, pageNum)}`,
  );

export const getPastCeremonies = (
  type: CeremonyFilterTypeApi,
  pageNum: number,
) =>
  API.get<CeremonyPageResponse>(
    `/api/v2/ceremonies/past?${buildParams(type, pageNum)}`,
  );
