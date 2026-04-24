import type { LockerPhase } from '@/entities/locker';

export const PHASE_LABEL: Record<LockerPhase, string> = {
  READY: '신청 준비',
  APPLY: '신청 기간',
  EXTEND: '연장 기간',
  CLOSED: '마감',
};
