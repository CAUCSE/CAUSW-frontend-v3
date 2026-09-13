import { HStack, Text } from '@causw/cds';

import { formatRelativeTime } from '@/shared/lib';

interface LatestSystemNoticeFooterProps {
  createdAt: string;
}

export const LatestSystemNoticeFooter = ({
  createdAt,
}: LatestSystemNoticeFooterProps) => {
  return (
    <HStack justify="end">
      <Text
        typography="body-14-regular"
        textColor="gray-400"
        className="ml-auto"
      >
        <span suppressHydrationWarning>{formatRelativeTime(createdAt)}</span>
      </Text>
    </HStack>
  );
};
