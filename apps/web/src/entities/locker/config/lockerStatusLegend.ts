import { LOCKER_STATUS } from './lockerStatus';

export const LOCKER_STATUS_LEGEND = {
  [LOCKER_STATUS.DISABLED]: {
    label: '선택 불가',
    backgroundColor: 'bg-gray-300',
    border: undefined,
  },
  [LOCKER_STATUS.AVAILABLE]: {
    label: '선택 가능',
    backgroundColor: 'bg-white',
    border: 'border-gray-300 border',
  },
  [LOCKER_STATUS.MINE]: {
    label: '내 사물함',
    backgroundColor: 'bg-blue-500',
    border: undefined,
  },
} as const;
