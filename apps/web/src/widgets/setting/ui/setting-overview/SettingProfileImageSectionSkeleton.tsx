import { HStack, Separator, Skeleton, VStack } from '@causw/cds';

import { DesktopOnly, MobileOnly } from '@/shared/ui';

export const SettingProfileImageSectionSkeleton = () => {
  return (
    <VStack align="center" gap="xs">
      <VStack align="center" gap="sm">
        <DesktopOnly>
          <Skeleton width={120} height={120} className="rounded-lg" />
        </DesktopOnly>
        <MobileOnly>
          <Skeleton width={80} height={80} className="rounded-lg" />
        </MobileOnly>
        <VStack align="center" gap="xs">
          <Skeleton width={122} height={20} className="rounded-sm" />
          <HStack gap="sm" align="center">
            <Skeleton width={64} height={20} className="rounded-sm" />
            <Separator orientation="vertical" />
            <Skeleton width={44} height={20} className="rounded-sm" />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
