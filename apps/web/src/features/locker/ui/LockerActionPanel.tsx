import { Button, mergeStyles } from '@causw/cds';

interface LockerActionPanelProps {
  canApply: boolean;
  canExtend: boolean;
  hasCurrentLocker: boolean;
  hasSelection: boolean;
  isCurrentLockerInActiveFloor: boolean;
  isPending: boolean;
  onApply: () => void;
  onExtend: () => void;
  onReturn: () => void;
}

export const LockerActionPanel = ({
  canApply,
  canExtend,
  hasCurrentLocker,
  hasSelection,
  isCurrentLockerInActiveFloor,
  isPending,
  onApply,
  onExtend,
  onReturn,
}: LockerActionPanelProps) => {
  if (isCurrentLockerInActiveFloor) {
    return (
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={onReturn}
          disabled={isPending}
          className={mergeStyles(
            'h-[3.25rem] flex-1 rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white',
            isPending
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-gray-700',
          )}
        >
          반납하기
        </Button>
        <Button
          type="button"
          onClick={onExtend}
          disabled={!canExtend || isPending}
          className={mergeStyles(
            'h-[3.25rem] flex-1 rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem]',
            canExtend && !isPending
              ? 'cursor-pointer bg-white text-gray-500'
              : 'cursor-not-allowed bg-gray-300 text-white',
          )}
        >
          연장하기
        </Button>
      </div>
    );
  }

  if (!canApply) {
    return (
      <Button
        type="button"
        disabled
        className="h-[3.25rem] w-full cursor-not-allowed rounded-md bg-gray-300 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white"
      >
        {hasCurrentLocker ? '반납하기' : '신청하기'}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={onApply}
      disabled={!hasSelection || isPending}
      className={mergeStyles(
        'h-[3.25rem] w-full rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] transition-colors',
        hasSelection && !isPending
          ? 'cursor-pointer bg-gray-700 text-white'
          : 'cursor-not-allowed bg-gray-300 text-white',
      )}
    >
      {hasCurrentLocker ? '반납하기' : '신청하기'}
    </Button>
  );
};
