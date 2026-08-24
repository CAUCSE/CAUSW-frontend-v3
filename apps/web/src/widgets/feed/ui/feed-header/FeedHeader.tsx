'use client';

import { useState } from 'react';

import Link from 'next/link';

import { BellOutline, HStack, Search } from '@causw/cds';

import { ROUTES } from '@/shared/constants';

import { CRAWLED_CHANNEL, type CrawledChannel } from '../../config';
import { FeedChannelDropdown } from '../feed-channel-dropdown';

export const FeedHeader = () => {
  const [selectedChannel, setSelectedChannel] = useState<CrawledChannel>(
    CRAWLED_CHANNEL.ALL,
  );

  return (
    <HStack
      as="header"
      className="items-center justify-between px-5 py-2 md:px-0 md:pt-5"
    >
      <FeedChannelDropdown
        value={selectedChannel}
        onChange={setSelectedChannel}
      />
      <HStack gap="lg" align="center">
        <Link href={ROUTES.NOTIFICATION} aria-label="알림">
          <BellOutline size={20} color="gray-600" />
        </Link>
        <Link href={ROUTES.FEED_SEARCH} aria-label="검색">
          <Search size={20} color="gray-600" />
        </Link>
      </HStack>
    </HStack>
  );
};
