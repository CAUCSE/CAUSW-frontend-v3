import type { MyCeremonyStateFilter, CeremonyState } from '../../model';

/** 내 경조사 상태 필터 → CeremonyState 매핑 */
export const MY_CEREMONY_STATE_MAP: Record<
  MyCeremonyStateFilter,
  CeremonyState
> = {
  '등록 완료': 'ACCEPT',
  '등록 거부': 'REJECT',
  '등록 대기중': 'AWAIT',
};
