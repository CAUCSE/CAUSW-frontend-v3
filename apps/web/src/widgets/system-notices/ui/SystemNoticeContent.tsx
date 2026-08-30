'use client';

import { Text, VStack } from '@causw/cds';

import { SystemNoticeHeader } from '@/features/system-notices';

import {
  type GetSystemNoticeResponseDto,
  SystemNoticeBody,
} from '@/entities/system-notices';

interface SystemNoticeContentProps {
  notice: GetSystemNoticeResponseDto;
}

export const SystemNoticeContent = ({ notice }: SystemNoticeContentProps) => {
  return (
    <VStack as="section" className="gap-6 bg-white px-5 py-2 md:p-5">
      <VStack gap="sm">
        <SystemNoticeHeader
          authorName={notice.authorName}
          createdAt={notice.createdAt}
        />
        {notice.title && (
          <Text typography="subtitle-18-bold" textColor="gray-800">
            {notice.title}
          </Text>
        )}
        <SystemNoticeBody content={notice.content} />
      </VStack>
    </VStack>
  );
};
