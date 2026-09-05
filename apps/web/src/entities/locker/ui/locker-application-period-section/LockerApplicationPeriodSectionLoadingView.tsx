import { HStack, Info, Skeleton, VStack } from '@causw/cds';

export const LockerApplicationPeriodSectionLoadingView = () => {
  return (
    <VStack gap="none" className="gap-2.5">
      <HStack gap="xs" align="center" className="px-1">
        <Info color="gray-400" size={16} />
        <Skeleton height={24} width={140} />
      </HStack>
      <Skeleton height={100} className="w-full" />
    </VStack>
  );
};
