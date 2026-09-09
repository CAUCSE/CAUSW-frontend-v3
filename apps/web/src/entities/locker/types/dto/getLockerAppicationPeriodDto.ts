import type { LockerApplicationPhase } from '../../config';

export interface GetLockerAppicationPeriodResponseDto {
  phase: LockerApplicationPhase;
  startAt: string | null;
  endAt: string | null;
}
