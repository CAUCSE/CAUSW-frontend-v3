import { HStack, Info, Skeleton, Text, VStack } from '@causw/cds';

export const LockerApplicationPeriodSectionLoadingView = () => {
  return (
    <VStack gap="none" className="gap-2.5">
      <HStack gap="xs" align="center" className="px-1">
        <Info color="gray-400" size={16} />
        <Text typography="subtitle-16-bold" textColor="gray-700">
          사물함 신청 기간 안내
        </Text>
      </HStack>
      <Skeleton height={100} className="w-full" />
    </VStack>
  );
};
