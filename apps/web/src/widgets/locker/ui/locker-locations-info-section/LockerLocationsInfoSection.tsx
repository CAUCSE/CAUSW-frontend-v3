'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { VStack } from '@causw/cds';

import {
  LockerAvailabilitySummary,
  lockerQueryOptions,
} from '@/entities/locker';

import { LockerLocationInfo } from '../locker-location-info';

export const LockerLocationsInfoSection = () => {
  const { data: lockerLocations } = useSuspenseQuery(
    lockerQueryOptions.lockerLocations(),
  );

  return (
    <VStack gap="none" as="section" className="gap-2.5">
      <LockerAvailabilitySummary
        availableCount={lockerLocations.summary.availableCount}
        totalCount={lockerLocations.summary.totalCount}
      />
      {lockerLocations.floors
        .sort((a, b) => a.floorName.localeCompare(b.floorName))
        .map((floor) => {
          return <LockerLocationInfo key={floor.locationId} floor={floor} />;
        })}
    </VStack>
  );
};
