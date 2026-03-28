import { VoteWriteValue } from '@/entities/post';

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

export const createEmptyVote = (): VoteWriteValue => ({
  options: [
    { id: crypto.randomUUID(), value: '' },
    { id: crypto.randomUUID(), value: '' },
  ],
  endTime: new Date(Date.now() + THREE_DAYS),
  allowMultiple: false,
});
