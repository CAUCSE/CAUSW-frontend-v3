import { HStack, VStack } from '@causw/cds';

import { LockerListHeader, LockerListMain } from '@/widgets/locker';

export const LockerListPage = () => {
  return (
    <HStack justify="center" className="w-full">
      <VStack gap="sm" className="w-full max-w-[900px] pb-4 md:px-8 md:pt-6">
        <LockerListHeader />
        <LockerListMain />
      </VStack>
    </HStack>
  );
};
