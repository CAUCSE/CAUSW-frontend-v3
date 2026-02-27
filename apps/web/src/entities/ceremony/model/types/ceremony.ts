export interface CeremonyUpcomingDto {
  id: string;
  title: string;
  type: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string | null;
  endTime: string | null;
  state: string | null;
}

export interface CeremonyUpcomingResponseDto {
  content: CeremonyUpcomingDto[];
}
export type CeremonyType = 'all' | 'celebration' | 'condolence';
