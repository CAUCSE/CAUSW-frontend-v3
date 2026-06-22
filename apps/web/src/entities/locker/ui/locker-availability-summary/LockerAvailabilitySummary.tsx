import { Text } from '@causw/cds';

import { type GetLockerLocationsResponseDto } from '../../types';

interface LockerAvailabilitySummaryProps {
  availableCount: GetLockerLocationsResponseDto['summary']['availableCount'];
  totalCount: GetLockerLocationsResponseDto['summary']['totalCount'];
}

export const LockerAvailabilitySummary = ({
  availableCount,
  totalCount,
}: LockerAvailabilitySummaryProps) => {
  return (
    <Text
      typography="subtitle-18-bold"
      textColor="gray-700"
      className="pl-1 whitespace-pre"
    >
      잔여{' '}
      <Text typography="subtitle-18-bold" textColor="blue-700">
        {availableCount}개
      </Text>
      <Text typography="subtitle-18-bold" textColor="gray-700">
        {' '}
        /{' '}
      </Text>
      <Text typography="subtitle-18-bold" textColor="gray-700">
        전체 {totalCount}개
      </Text>
    </Text>
  );
};
