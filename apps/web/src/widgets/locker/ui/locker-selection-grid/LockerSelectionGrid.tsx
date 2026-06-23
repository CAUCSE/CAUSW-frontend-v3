import { Grid } from '@causw/cds';

import { LockerSelectButton } from '@/features/locker';

import { type GetLockerLocationResponseDto } from '@/entities/locker';

interface LockerSelectionGridProps {
  lockers: GetLockerLocationResponseDto['lockers'];
  selectedLockerId: string | null;
  onSelectLocker: (lockerId: string) => void;
}

export const LockerSelectionGrid = ({
  lockers,
  selectedLockerId,
  onSelectLocker,
}: LockerSelectionGridProps) => {
  return (
    <Grid
      columns="none"
      className="min-h-0 w-full flex-1 grid-cols-5 gap-x-2 gap-y-4 overflow-y-auto"
    >
      {lockers.map((locker) => {
        return (
          <LockerSelectButton
            key={locker.lockerId}
            locker={locker}
            isSelected={selectedLockerId === locker.lockerId}
            onClick={() => onSelectLocker(locker.lockerId)}
          />
        );
      })}
    </Grid>
  );
};
