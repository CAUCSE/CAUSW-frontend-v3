import { API } from '@/shared/api';

import type {
  CeremonyDetailContext,
  CeremonyDetailResponse,
} from '../../model';

export const getCeremonyDetail = (
  ceremonyId: string,
  context: CeremonyDetailContext = 'general',
) =>
  API.get<CeremonyDetailResponse>(
    `/api/v2/ceremonies/${ceremonyId}?context=${context}`,
  );
