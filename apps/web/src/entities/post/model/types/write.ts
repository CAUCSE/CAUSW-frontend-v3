import { POST_CATEGORIES } from '../../config';

export type PostCategory = (typeof POST_CATEGORIES)[number];

export interface VoteWriteOption {
  id: string;
  value: string;
}

export interface VoteWriteValue {
  options: VoteWriteOption[];
  endTime: Date | null;
  allowMultiple: boolean;
}
