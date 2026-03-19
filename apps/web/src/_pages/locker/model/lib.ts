import type { LockerDetailItem, LockerPhase } from '@/entities/locker';

import type { LockerStatus } from './types';

export const PHASE_LABEL: Record<LockerPhase, string> = {
  READY: '신청 준비',
  APPLY: '신청 기간',
  EXTEND: '연장 기간',
  CLOSED: '마감',
};

export const formatDateTime = (value?: string | null) => {
  if (!value) return '-';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const getPeriodLabel = (startAt?: string, endAt?: string) => {
  if (!startAt || !endAt) return '기간 정보가 없어요.';
  return `${formatDateTime(startAt)} - ${formatDateTime(endAt)}`;
};

export const getFloorNameFromDisplayName = (displayName?: string | null) => {
  return displayName?.split(' ')[0] ?? null;
};

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
