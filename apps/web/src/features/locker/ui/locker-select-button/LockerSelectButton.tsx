import { Button, mergeStyles, Text } from '@causw/cds';

import {
  type GetLockerLocationResponseDto,
  LOCKER_STATUS,
} from '@/entities/locker';

interface LockerSelectButtonProps {
  locker: GetLockerLocationResponseDto['lockers'][number];
  canChangeLockerState?: boolean;
  hasLocker?: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const LockerSelectButton = ({
  locker,
  canChangeLockerState = false,
  hasLocker = false,
  isSelected,
  onClick,
}: LockerSelectButtonProps) => {
  const isDisable =
    locker.status === LOCKER_STATUS.DISABLED ||
    locker.status === LOCKER_STATUS.IN_USE ||
    !canChangeLockerState;

  const isMine = locker.status === LOCKER_STATUS.MINE;

  return (
    <Button
      onClick={hasLocker ? undefined : onClick}
      disabled={isDisable || isMine}
      className={mergeStyles(
        'flex h-full items-center justify-center rounded-md bg-white py-5 disabled:opacity-100!',
        hasLocker && 'pointer-events-none',
        isDisable && 'bg-gray-200! [&_span]:text-gray-300!',
        isMine &&
          canChangeLockerState &&
          'bg-blue-500! disabled:bg-blue-500! [&_span]:text-gray-50! disabled:[&_span]:text-gray-50!',
        isSelected && 'ring-2 ring-blue-700 ring-inset',
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
