import { type ValueOf } from '@/shared/lib';

export const LOCKER_STATUS = {
  AVAILABLE: 'AVAILABLE',
  MINE: 'MINE',
  IN_USE: 'IN_USE',
  DISABLED: 'DISABLED',
} as const;

export type LockerStatus = ValueOf<typeof LOCKER_STATUS>;
