import { Flex, HStack, OfficialColored, Text } from '@causw/cds';

import { formatRelativeTime } from '@/shared/lib';
//import { type ProfileImageValue } from '@/shared/types'; 현재 미사용
//import { ProfileAvatar } from '@/shared/ui'; 현재 미사용

interface LatestSystemNoticeHeaderProps {
  authorName: string;
  createdAt: string;
  //profileImage?: ProfileImageValue; 현재 미사용
  isOfficial?: boolean; // 공식 마크 사용 여부 불확실
}

export const LatestSystemNoticeHeader = ({
  authorName,
  createdAt,
  //profileImage, 현재 미사용
  isOfficial = false, // 공식 마크 사용 여부 불확실
}: LatestSystemNoticeHeaderProps) => {
  return (
    <Flex as="header" gap="none" align="center">
      <HStack gap="sm" align="center" className="flex-1 gap-2.5">
        {/* 현재 미사용
        {profileImage ? (
          <ProfileAvatar
            profileImageType={profileImage.profileImageType}
            profileImageUrl={profileImage.profileImageUrl}
            size={40}
            className="shrink-0"
          />
        ) : null}
        */}

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
