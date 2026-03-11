import type { CeremonyFilterType, CeremonyFilterTypeApi } from '../../model';

export const FILTER_TYPE_API_MAP: Record<
  CeremonyFilterType,
  CeremonyFilterTypeApi
> = {
  전체: 'all',
  경사: 'celebration',
  조사: 'condolence',
};
