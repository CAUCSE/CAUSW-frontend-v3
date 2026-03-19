export type LockerToastType = 'success' | 'error' | 'loading';

export type LockerToastItem = {
  id: string;
  message: string;
  type: LockerToastType;
};
