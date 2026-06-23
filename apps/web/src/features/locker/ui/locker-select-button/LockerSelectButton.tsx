import { Button, mergeStyles, Text } from '@causw/cds';

import {
  type GetLockerLocationResponseDto,
  LOCKER_STATUS,
} from '@/entities/locker';

interface LockerSelectButtonProps {
  locker: GetLockerLocationResponseDto['lockers'][number];
  isSelected: boolean;
  onClick: () => void;
}

export const LockerSelectButton = ({
  locker,
  isSelected,
  onClick,
}: LockerSelectButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={
        locker.status === LOCKER_STATUS.DISABLED ||
        locker.status === LOCKER_STATUS.MINE
      }
      className={mergeStyles(
        'flex h-full items-center justify-center rounded-md bg-white py-5',
        locker.status === LOCKER_STATUS.DISABLED &&
          'bg-gray-200! [&_span]:text-gray-300!',
        isSelected && 'border-2 border-blue-700',
      )}
    >
      <Text
        typography="body-18-medium"
        textColor={isSelected ? 'blue-700' : 'gray-700'}
      >
        {locker.number}
      </Text>
    </Button>
  );
};
