export const lockerQueryKey = {
  all: ['locker'] as const,
  periodStatus: () => [...lockerQueryKey.all, 'periodStatus'] as const,
  me: () => [...lockerQueryKey.all, 'me'] as const,
  locations: () => [...lockerQueryKey.all, 'locations'] as const,
  location: (locationId: string) =>
    [...lockerQueryKey.all, 'location', locationId] as const,
};
