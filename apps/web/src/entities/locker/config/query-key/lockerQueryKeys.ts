export const lockerQueryKeys = {
  all: ['locker'] as const,
  myLocker: () => [...lockerQueryKeys.all, 'my-locker'] as const,
};
