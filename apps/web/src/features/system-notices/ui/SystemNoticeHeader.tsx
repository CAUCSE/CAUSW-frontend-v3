import { Flex, HStack, OfficialColored, Text } from '@causw/cds';

import { formatRelativeTime } from '@/shared/lib';

interface SystemNoticeHeaderProps {
  authorName: string;
  createdAt: string;
  isOfficial?: boolean;
}

export const SystemNoticeHeader = ({
  authorName,
  createdAt,
  isOfficial = false,
}: SystemNoticeHeaderProps) => {
  return (
    <Flex as="header" gap="none" align="center">
      <HStack gap="sm" align="center" className="flex-1 gap-2.5">
        <HStack gap="sm" align="center">
          <HStack gap="xs" align="center">
            <Text typography="subtitle-16-bold" textColor="gray-800">
              {authorName}
            </Text>
            {isOfficial && <OfficialColored size={12} />}
          </HStack>

          <Text typography="body-16-regular" textColor="gray-500">
            <span suppressHydrationWarning>
              {formatRelativeTime(createdAt)}
            </span>
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
};
