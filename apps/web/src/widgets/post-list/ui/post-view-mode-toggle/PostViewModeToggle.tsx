'use client';

import { ArrowDown, Check, Dropdown, HStack, Text } from '@causw/cds';

import {
  POST_VIEW_MODE_LABEL,
  POST_VIEW_MODE_OPTIONS,
  type PostViewMode,
} from '@/entities/post';

import { POST_VIEW_MODE_ICON } from '../../config';

interface PostViewModeToggleProps {
  value: PostViewMode;
  onChange: (value: PostViewMode) => void;
}

export const PostViewModeToggle = ({
  value,
  onChange,
}: PostViewModeToggleProps) => {
  const TriggerIcon = POST_VIEW_MODE_ICON[value];

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          aria-label="게시글 보기 방식 선택"
          suppressHydrationWarning
          className="flex shrink-0 cursor-pointer items-center gap-1 py-1 pr-0.5 pl-1.5"
        >
          <TriggerIcon size={12} color="gray-500" />
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content align="start" className="min-w-0">
        {POST_VIEW_MODE_OPTIONS.map((option) => {
          const OptionIcon = POST_VIEW_MODE_ICON[option];
          const isSelectedViewMode = value === option;

          return (
            <Dropdown.Item
              key={option}
              className="w-full rounded-none px-4 py-2"
              onSelect={() => onChange(option)}
            >
              <HStack align="center" className="gap-2">
                <OptionIcon
                  size={12}
                  color={isSelectedViewMode ? 'gray-800' : 'gray-500'}
                />
                <Text
                  typography={
                    isSelectedViewMode ? 'body-15-semibold' : 'body-15-regular'
                  }
                  textColor={isSelectedViewMode ? 'gray-800' : 'gray-500'}
                >
                  {POST_VIEW_MODE_LABEL[option]}
                </Text>
                {isSelectedViewMode && <Check size={10} color="gray-800" />}
              </HStack>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
};
