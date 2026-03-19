import type { LockerDetailItem } from '@/entities/locker';

export type LockerStatus = 'available' | 'disabled' | 'mine';

export type ActiveFloor = {
  locationId: string;
  floorName: string;
};

export type LockerGridItem = LockerDetailItem & {
  lockerNumber: number;
  viewStatus: LockerStatus;
};

export type LockerToastType = 'success' | 'error' | 'loading';

export type LockerToastItem = {
  id: string;
  message: string;
  type: LockerToastType;
};
