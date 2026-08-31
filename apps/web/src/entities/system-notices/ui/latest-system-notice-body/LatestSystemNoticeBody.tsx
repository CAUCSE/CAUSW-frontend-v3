'use client';

import { Text, VStack } from '@causw/cds';

import { useLinkifiedText } from '@/shared/hooks';

interface LatestSystemNoticeBodyProps {
  title: string;
  content: string;
}

export const LatestSystemNoticeBody = ({
  title,
  content,
}: LatestSystemNoticeBodyProps) => {
  const { linkifiedContent } = useLinkifiedText({ content, isHtml: false });

  return (
    <VStack gap="none">
      <Text
        typography="subtitle-16-bold"
        textColor="gray-800"
        className="mb-1 break-all"
      >
        {title}
      </Text>
      <Text
        as="p"
        typography="body-15-regular"
        textColor="gray-700"
        className="break-all whitespace-pre-wrap"
      >
        {linkifiedContent}
      </Text>
    </VStack>
  );
};
