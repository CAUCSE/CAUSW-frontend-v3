'use client';

import { ArrowDown, Check, Dropdown, HStack, Text } from '@causw/cds';

import {
  FEED_VIEW_MODE,
  FEED_VIEW_MODE_LABEL,
  type FeedViewMode,
} from '@/entities/feed';

interface FeedViewModeToggleProps {
  value: FeedViewMode;
  onChange: (value: FeedViewMode) => void;
}

const FEED_VIEW_MODE_OPTIONS: FeedViewMode[] = [
  FEED_VIEW_MODE.COMPACT,
  FEED_VIEW_MODE.CARD,
];

export const FeedViewModeToggle = ({
  value,
  onChange,
}: FeedViewModeToggleProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          aria-label="게시글 보기 방식 선택"
          suppressHydrationWarning
          className="flex shrink-0 cursor-pointer items-center gap-1 py-1 pr-0.5 pl-1.5"
        >
          <OutlineListThreeIcon />
          <ArrowDown size={14} color="gray-500" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content align="start" className="min-w-0">
        {FEED_VIEW_MODE_OPTIONS.map((option) => {
          const OptionIcon = FEED_VIEW_MODE_ICON[option];
          const isSelectedViewMode = value === option;

          return (
            <Dropdown.Item
              key={option}
              className="w-full rounded-none px-4 py-2"
              onSelect={(event) => {
                event.preventDefault?.();
                onChange(option);
              }}
            >
              <HStack align="center" className="gap-2">
                <OptionIcon />
                <Text
                  typography={
                    isSelectedViewMode ? 'body-15-semibold' : 'body-15-regular'
                  }
                  textColor={isSelectedViewMode ? 'gray-800' : 'gray-500'}
                >
                  {FEED_VIEW_MODE_LABEL[option]}
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

// TODO: cds/icons 반영 후 수정 필요
const OutlineListThreeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <g clipPath="url(#clip0_12433_107619)">
      <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#6A7282" />
      <line
        x1="1.15015"
        y1="4.47156"
        x2="10.85"
        y2="4.47156"
        stroke="#6A7282"
      />
      <line
        x1="1.15015"
        y1="7.53986"
        x2="10.85"
        y2="7.53986"
        stroke="#6A7282"
      />
    </g>
    <defs>
      <clipPath id="clip0_12433_107619">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const OutlineListTwoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <g clipPath="url(#clip0_12398_106582)">
      <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#6A7282" />
      <line
        x1="1.15015"
        y1="6.02431"
        x2="10.85"
        y2="6.02431"
        stroke="#6A7282"
      />
    </g>
    <defs>
      <clipPath id="clip0_12398_106582">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const FEED_VIEW_MODE_ICON: Record<FeedViewMode, () => React.JSX.Element> = {
  [FEED_VIEW_MODE.COMPACT]: OutlineListThreeIcon,
  [FEED_VIEW_MODE.CARD]: OutlineListTwoIcon,
};
