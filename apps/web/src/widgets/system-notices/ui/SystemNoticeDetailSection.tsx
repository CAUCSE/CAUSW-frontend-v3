'use client';

import { useEffect, useRef } from 'react';

import { Stack } from '@causw/cds';

import { useMarkSystemNoticeAsRead } from '@/features/system-notices';

import { useSystemNoticeLatest } from '@/entities/system-notices';

import { SystemNoticeContent } from './SystemNoticeContent';

export const SystemNoticeDetailSection = () => {
  const { data: notice } = useSystemNoticeLatest();
  const { mutate: markAsRead } = useMarkSystemNoticeAsRead();
  const markedNoticeIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (markedNoticeIdRef.current === notice.id) return;

    markedNoticeIdRef.current = notice.id;
    markAsRead(notice.id, {
      onError: () => {
        markedNoticeIdRef.current = null;
      },
    });
  }, [notice.id, markAsRead]);

  return (
    <Stack
      gap="none"
      className="h-full overflow-scroll md:rounded-t-lg [&::-webkit-scrollbar]:hidden"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <SystemNoticeContent notice={notice} />
    </Stack>
  );
};
