import { mergeStyles } from '@causw/cds';

import { getLockerCellClassName, type LockerGridItem } from '../model';

interface LockerSelectionGridProps {
  disableAvailableLockers?: boolean;
  lockers: LockerGridItem[];
  onSelect: (lockerId: string) => void;
  selectedLockerId: string | null;
}

export const LockerSelectionGrid = ({
  disableAvailableLockers = false,
  lockers,
  onSelect,
  selectedLockerId,
}: LockerSelectionGridProps) => {
  return (
    <div className="desktop:gap-3 grid grid-cols-5 gap-2">
      {lockers.map((locker) => {
        const isSelected = selectedLockerId === locker.lockerId;
        const resolvedStatus =
          disableAvailableLockers && locker.viewStatus === 'available'
            ? 'disabled'
            : locker.viewStatus;
        const isClickable = resolvedStatus === 'available';

        return (
          <button
            key={locker.lockerId}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onSelect(locker.lockerId)}
            className={mergeStyles(
              'flex h-[4.3125rem] items-center justify-center rounded-md text-lg tracking-[-0.0225rem] transition-colors',
              isClickable ? 'cursor-pointer' : 'cursor-not-allowed',
              getLockerCellClassName(resolvedStatus, isSelected),
            )}
          >
            {locker.lockerNumber}
          </button>
        );
      })}
    </div>
  );
};
