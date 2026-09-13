'use client';

import { ArrowDown, Check, Dropdown, HStack, Text } from '@causw/cds';

import { POST_LIST_TAB } from '@/widgets/post-list';

import { type Board } from '@/entities/board';

import { ALL_CHANNEL_LABEL, ALL_CHANNEL_TRIGGER_LABEL } from '../../config';

interface FeedChannelDropdownProps {
  boards: Board[];
  value: string;
  onChange: (value: string) => void;
}

export const FeedChannelDropdown = ({
  boards,
  value,
  onChange,
}: FeedChannelDropdownProps) => {
  const selectedBoard = boards.find((board) => board.id === value);
  const triggerLabel = selectedBoard?.name ?? ALL_CHANNEL_TRIGGER_LABEL;

  const channels = [
    { id: POST_LIST_TAB.ALL, name: ALL_CHANNEL_LABEL },
    ...boards,
  ];

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
            {triggerLabel}
          </Text>
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content align="start" className="min-w-45 -translate-x-1">
        {channels.map((channel) => {
          const isSelectedChannel = value === channel.id;

          return (
            <Dropdown.Item
              key={channel.id}
              className="rounded-none px-4 py-2"
              onSelect={() => onChange(channel.id)}
            >
              <HStack align="center" className="w-full gap-2">
                <Text
                  typography={
                    isSelectedChannel ? 'body-15-semibold' : 'body-15-regular'
                  }
                  textColor={isSelectedChannel ? 'gray-800' : 'gray-500'}
                >
                  {channel.name}
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
