export const lockerQueryKeys = {
  all: ['locker'] as const,
  myLocker: () => [...lockerQueryKeys.all, 'my-locker'] as const,
  lockerLocations: () => [...lockerQueryKeys.all, 'locker-locations'] as const,
  lockerApplicationPeriod: () =>
    [...lockerQueryKeys.all, 'locker-application-period'] as const,
};
