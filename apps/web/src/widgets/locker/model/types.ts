import type { LockerDetailItem } from '@/entities/locker';

export type ActiveFloor = {
  locationId: string;
  floorName: string;
};

export type LockerStatus = 'available' | 'disabled' | 'mine';

export type LockerGridItem = LockerDetailItem & {
  lockerNumber: number;
  viewStatus: LockerStatus;
};
