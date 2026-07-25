export interface GetLockerAppicationPeriodResponseDto {
  phase: 'READY' | 'APPLY' | 'EXTEND' | 'CLOSED';
  startAt: string | null;
  endAt: string | null;
}
