export interface VoteWriteOption {
  id: string;
  value: string;
}

export interface VoteWriteValue {
  options: VoteWriteOption[];
  endTime: Date | null;
  allowMultiple: boolean;
}
