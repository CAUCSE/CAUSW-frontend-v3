'use client';

import { ArrowDown, Dropdown, Text } from '@causw/cds';

import { ALL_CHANNEL_TRIGGER_LABEL } from '../../config';

export const FeedChannelDropdownLoadingView = () => {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          aria-label="채널 선택"
          suppressHydrationWarning
          className="flex cursor-pointer items-center gap-2"
        >
          <Text typography="subtitle-18-bold" textColor="gray-700">
            {ALL_CHANNEL_TRIGGER_LABEL}
          </Text>
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Dropdown.Trigger>
    </Dropdown>
  );
};
