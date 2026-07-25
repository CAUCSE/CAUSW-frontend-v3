export interface GetLockerLocationResponseDto {
  floor: {
    locationId: string;
    locationName: string;
  };
  currentPolicy: {
    canApply: boolean;
    canExtend: boolean;
    expireDate: string | null;
  };
  summary: {
    totalCount: number;
    availableCount: number;
  };
  lockers: {
    lockerId: string;
    number: string;
    status: 'AVAILABLE' | 'MINE' | 'IN_USE' | 'DISABLED';
  }[];
}
