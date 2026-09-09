import { HStack, Text } from '@causw/cds';

import { ProfileAvatar } from '@/shared/ui';

interface LatestSystemNoticeHeaderProps {
  authorName: string;
  createdAt: string;
  isOfficial?: boolean;
}

export const LatestSystemNoticeHeader = ({
  authorName,
}: LatestSystemNoticeHeaderProps) => {
  return (
    <HStack align="center" className="flex-1 gap-1.5">
      <ProfileAvatar profileImageType="GHOST" size={20} className="shrink-0" />

      <Text typography="body-14-semibold" textColor="gray-900">
        {authorName}
      </Text>
    </HStack>
  );
};
