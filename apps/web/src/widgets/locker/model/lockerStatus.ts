import type { LockerDetailItem } from '@/entities/locker';

import type { LockerStatus } from './types';

export const getLockerCellClassName = (
  status: LockerStatus,
  isSelected: boolean,
) => {
  if (status === 'mine' || isSelected) {
    return 'bg-blue-500 text-gray-50 font-bold';
  }

  if (status === 'disabled') {
    return 'bg-gray-200 text-gray-300';
  }

  return 'bg-white text-gray-700';
};

export const getLockerViewStatus = (
  locker: LockerDetailItem,
  currentLockerId: string | null,
): LockerStatus => {
  if (locker.lockerId === currentLockerId || locker.status === 'MINE') {
    return 'mine';
  }

  if (locker.status === 'AVAILABLE') {
    return 'available';
  }

  return 'disabled';
};
