'use client';

import { RatioChart } from '@causw/cds';

import { formatVoteStatus } from '../lib';
import { type VoteOption } from '../model';

interface PostVoteProps {
  options: VoteOption[];
  endTime: string;
}

export const PostVote = ({ options, endTime }: PostVoteProps) => {
  return (
    <RatioChart.Root>
      {options.map((opt) => (
        <RatioChart.Item
          key={opt.value}
          value={opt.value}
          label={opt.label}
          count={opt.count}
        />
      ))}
      <RatioChart.Footer endTime={formatVoteStatus(endTime)} />
    </RatioChart.Root>
  );
};
