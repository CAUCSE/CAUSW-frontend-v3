export type LockerPhase = 'READY' | 'APPLY' | 'EXTEND' | 'CLOSED';

export type LockerPeriodStatusResponse = {
  phase: LockerPhase;
  startAt: string;
  endAt: string;
};

export type LockerMyResponse = {
  hasLocker: boolean;
  lockerId: string | null;
  displayName: string | null;
  expiredAt: string | null;
};

export type LockerLocationSummary = {
  locationId: string;
  floorName: string;
  totalCount: number;
  availableCount: number;
};

export type LockerLocationsResponse = {
  summary: {
    totalCount: number;
    availableCount: number;
  };
  floors: LockerLocationSummary[];
};

export type LockerDetailPolicy = {
  canApply: boolean;
  canExtend: boolean;
};

export type LockerDetailSummary = {
  totalCount: number;
  availableCount: number;
};

export type LockerDetailItemStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'MINE';

export type LockerDetailItem = {
  lockerId: string;
  number: string;
  status: LockerDetailItemStatus;
};

export type LockerLocationDetailResponse = {
  floor: {
    locationId: string;
    locationName: string;
  };
  currentPolicy: LockerDetailPolicy;
  summary: LockerDetailSummary;
  lockers: LockerDetailItem[];
};
