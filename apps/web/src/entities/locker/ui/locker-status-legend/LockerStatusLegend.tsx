import { HStack, mergeStyles, Text } from '@causw/cds';

import { LOCKER_STATUS_LEGEND } from '../../config';

export const LockerStatusLegend = () => {
  return (
    <HStack gap="none" className="gap-3">
      {Object.values(LOCKER_STATUS_LEGEND).map((status) => {
        return (
          <HStack
            key={status.label}
            align="center"
            gap="none"
            className="gap-1.5"
          >
            <div
              className={mergeStyles(
                'size-4.5 rounded-xs',
                status.backgroundColor,
                status.border,
              )}
            />
            <Text typography="body-14-regular" textColor="gray-500">
              {status.label}
            </Text>
          </HStack>
        );
      })}
    </HStack>
  );
};
