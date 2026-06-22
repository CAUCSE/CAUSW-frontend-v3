import { HStack, Text, VStack } from '@causw/cds';

import { OpenLockerApplicationButton } from '@/features/locker';

import { type GetLockerLocationsResponseDto } from '@/entities/locker';

interface LockerLocationInfoProps {
  floor: GetLockerLocationsResponseDto['floors'][number];
}

export const LockerLocationInfo = ({ floor }: LockerLocationInfoProps) => {
  return (
    <VStack gap="md" className="rounded-md bg-white p-4">
      <HStack justify="between" align="center">
        <Text typography="subtitle-18-bold" textColor="gray-700">
          {floor.floorName}
        </Text>
        <Text typography="subtitle-18-bold" textColor="gray-700">
          잔여 {floor.availableCount}개
        </Text>
      </HStack>
      <VStack gap="sm">
        <div className="relative h-2 w-full rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-blue-700"
            style={{
              width: `${(floor.availableCount / floor.totalCount) * 100}%`,
            }}
          />
        </div>
        <Text
          typography="body-14-regular"
          textColor="gray-400"
          className="text-end"
        >
          전체 {floor.totalCount}개
        </Text>
      </VStack>
      <OpenLockerApplicationButton lockerLocationId={floor.locationId} />
    </VStack>
  );
};
