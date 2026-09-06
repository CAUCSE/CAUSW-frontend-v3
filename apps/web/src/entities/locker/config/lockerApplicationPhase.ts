import { type ValueOf } from '@/shared/lib';

export const LOCKER_APPLICATION_PHASE = {
  READY: 'READY',
  APPLY: 'APPLY',
  EXTEND: 'EXTEND',
  CLOSED: 'CLOSED',
} as const;

export type LockerApplicationPhase = ValueOf<typeof LOCKER_APPLICATION_PHASE>;
