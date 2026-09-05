'use client';

import { useFeedMain } from '../../model';

import { FeedChannelDropdown } from './FeedChannelDropdown';

export const FeedChannelDropdownSection = () => {
  const { data: boards, selectedTab, handleTabChange } = useFeedMain();

  return (
    <FeedChannelDropdown
      boards={boards}
      value={selectedTab}
      onChange={handleTabChange}
    />
  );
};
