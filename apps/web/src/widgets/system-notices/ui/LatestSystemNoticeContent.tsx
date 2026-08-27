'use client';

import { VStack } from '@causw/cds';

import { LatestSystemNoticeHeader } from '@/features/system-notices';

import {
  type GetSystemNoticeResponseDto,
  LatestSystemNoticeBody,
} from '@/entities/system-notices';

interface NoticeContentProps {
  notice: GetSystemNoticeResponseDto;
}

export const LatestSystemNoticeContent = ({ notice }: NoticeContentProps) => {
  return (
    <VStack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <VStack gap="sm">
        <LatestSystemNoticeHeader
          authorName={notice.authorName}
          createdAt={notice.createdAt}
          //profileImage={} 사용 여부 불확실
          isOfficial={true}
        />
        <LatestSystemNoticeBody
          content={notice.content}
          //images={notice.fileUrlList} 현재 정책상 미사용
        />
      </VStack>
    </VStack>
  );
};
