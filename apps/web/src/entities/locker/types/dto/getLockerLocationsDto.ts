import type { LockerFloor, LockerSummary } from '../locker';

export interface GetLockerLocationsResponseDto {
  summary: LockerSummary;
  floors: LockerFloor[];
}
