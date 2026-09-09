'use client';

import { useEffect, useRef } from 'react';

import { Stack, VStack } from '@causw/cds';

import { useMarkSystemNoticeAsRead } from '@/features/system-notices';

import { useSystemNoticeLatest } from '@/entities/system-notices';

import { LatestSystemNoticeContent } from '../latest-system-notice-content';

import { LatestSystemNoticeDetailSectionEmptyView } from './LatestSystemNoticeDetailSectionEmptyView';

export const LatestSystemNoticeDetailSection = () => {
  const { data: notice } = useSystemNoticeLatest();
  const { mutate: markAsRead } = useMarkSystemNoticeAsRead();
  const markedNoticeIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!notice.id) return;
    if (notice.isRead) return;
    if (markedNoticeIdRef.current === notice.id) return;

    markedNoticeIdRef.current = notice.id;
    markAsRead(notice.id, {
      onError: () => {
        markedNoticeIdRef.current = null;
      },
    });
  }, [notice.id, notice.isRead, markAsRead]);

  if (!notice.id) {
    return <LatestSystemNoticeDetailSectionEmptyView />;
  }

  return (
    <VStack
      gap="none"
      className="min-h-0 flex-1 overflow-hidden bg-white md:rounded-[1rem] md:border md:border-gray-200 md:pt-5"
    >
      <Stack
        gap="none"
        className="min-h-0 flex-1 overflow-scroll [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <LatestSystemNoticeContent notice={notice} />
      </Stack>
    </VStack>
  );
};
