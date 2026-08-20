'use client';

import { ArrowDown, Check, Dropdown, HStack, Text } from '@causw/cds';

import {
  CRAWLED_CHANNEL_LABEL,
  CRAWLED_CHANNEL_OPTIONS,
  CRAWLED_CHANNEL_TRIGGER_LABEL,
  type CrawledChannel,
} from '../../config';

interface FeedChannelDropdownProps {
  value: CrawledChannel;
  onChange: (value: CrawledChannel) => void;
}

export const FeedChannelDropdown = ({
  value,
  onChange,
}: FeedChannelDropdownProps) => {
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
            {CRAWLED_CHANNEL_TRIGGER_LABEL[value]}
          </Text>
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content align="start" className="-translate-x-1">
        {CRAWLED_CHANNEL_OPTIONS.map((channel) => {
          const isSelectedChannel = value === channel;

          return (
            <Dropdown.Item
              key={channel}
              className="rounded-none px-4 py-2"
              onSelect={() => onChange(channel)}
            >
              <HStack align="center" className="w-full gap-2">
                <Text
                  typography={
                    isSelectedChannel ? 'body-15-semibold' : 'body-15-regular'
                  }
                  textColor={isSelectedChannel ? 'gray-800' : 'gray-500'}
                >
                  {CRAWLED_CHANNEL_LABEL[channel]}
                </Text>
                {isSelectedChannel && <Check size={10} color="gray-800" />}
              </HStack>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
};
