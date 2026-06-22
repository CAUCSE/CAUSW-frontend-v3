export interface GetLockerAppicationPeriodResponseDto {
  phase: 'READY' | 'APPLY' | 'EXTEND' | 'CLOSED';
  startAt: string;
  endAt: string;
}
