'use client';

import { Stack } from '@causw/cds';

import { useSystemNoticeLatest } from '@/entities/system-notices';
import { updateSystemNoticesIsRead } from '@/entities/system-notices';

import { LatestSystemNoticeContent } from './LatestSystemNoticeContent';

export const LatestSystemNoticeDetailSection = () => {
  const { data: notice } = useSystemNoticeLatest();
  updateSystemNoticesIsRead(notice.id);

  return (
    <>
      <Stack
        gap="none"
        className="h-full overflow-scroll md:rounded-t-lg [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <LatestSystemNoticeContent notice={notice} />
      </Stack>
    </>
  );
};
