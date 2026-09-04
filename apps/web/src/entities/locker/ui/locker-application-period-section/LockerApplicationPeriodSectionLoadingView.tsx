import { HStack, Info, Skeleton, Text, VStack } from '@causw/cds';

import { DEFAULT_LOCKER_APPLICATION_PERIOD_TITLE } from '../../config';

export const LockerApplicationPeriodSectionLoadingView = () => {
  return (
    <VStack gap="none" className="gap-2.5">
      <HStack gap="xs" align="center" className="px-1">
        <Info color="gray-400" size={16} />
        <Text typography="subtitle-16-bold" textColor="gray-700">
          {DEFAULT_LOCKER_APPLICATION_PERIOD_TITLE}
        </Text>
      </HStack>
      <Skeleton height={100} className="w-full" />
    </VStack>
  );
};
