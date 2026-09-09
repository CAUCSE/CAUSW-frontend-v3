'use client';

import { VStack } from '@causw/cds';

import { LatestSystemNoticeHeader } from '@/features/system-notices';

import {
  type GetSystemNoticeResponseDto,
  LatestSystemNoticeBody,
  LatestSystemNoticeFooter,
} from '@/entities/system-notices';

interface LatestSystemNoticeContentProps {
  notice: GetSystemNoticeResponseDto;
}

export const LatestSystemNoticeContent = ({
  notice,
}: LatestSystemNoticeContentProps) => {
  return (
    <VStack
      as="section"
      className="gap-4 border-b border-gray-100 bg-white px-5 pb-4"
    >
      <VStack gap="sm">
        <LatestSystemNoticeHeader
          authorName={notice.authorName}
          createdAt={notice.createdAt}
        />
        <LatestSystemNoticeBody title={notice.title} content={notice.content} />
      </VStack>
      <LatestSystemNoticeFooter createdAt={notice.createdAt} />
    </VStack>
  );
};
