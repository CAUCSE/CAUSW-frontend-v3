import { HStack, Separator, Skeleton, VStack } from '@causw/cds';

export const SettingProfileImageSectionSkeleton = () => {
  return (
    <VStack align="center" gap="xs">
      <VStack align="center" gap="sm">
        <Skeleton width={88} height={88} className="rounded-lg" />
        <VStack align="center" gap="xs">
          <Skeleton width={122} height={20} className="rounded-sm" />
          <HStack gap="sm" align="center">
            <Skeleton width={64} height={20} className="rounded-sm" />
            <Separator orientation="vertical" className="gray-400 h-2" />
            <Skeleton width={64} height={20} className="rounded-sm" />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};
