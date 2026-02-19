export interface VoteOption {
  value: string;
  label: string;
  count: number;
}

export interface VoteData {
  options: VoteOption[];
  endTime: string;
}

export type PostAction = 'edit' | 'delete' | 'report' | 'block';
