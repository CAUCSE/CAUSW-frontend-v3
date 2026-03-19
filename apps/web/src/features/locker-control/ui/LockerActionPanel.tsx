import { mergeStyles } from '@causw/cds';

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
}: {
  canApply: boolean;
  canExtend: boolean;
  hasCurrentLocker: boolean;
  hasSelection: boolean;
  isCurrentLockerInActiveFloor: boolean;
  isPending: boolean;
  onApply: () => void;
  onExtend: () => void;
  onReturn: () => void;
}) => {
  if (isCurrentLockerInActiveFloor) {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReturn}
          disabled={isPending}
          className={mergeStyles(
            'flex h-[3.25rem] flex-1 items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white',
            isPending
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-gray-700',
          )}
        >
          반납하기
        </button>
        <button
          type="button"
          onClick={onExtend}
          disabled={!canExtend || isPending}
          className={mergeStyles(
            'flex h-[3.25rem] flex-1 items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem]',
            canExtend && !isPending
              ? 'cursor-pointer bg-white text-gray-500'
              : 'cursor-not-allowed bg-gray-300 text-white',
          )}
        >
          연장하기
        </button>
      </div>
    );
  }

  if (!canApply) {
    return (
      <button
        type="button"
        disabled
        className="flex h-[3.25rem] w-full cursor-not-allowed items-center justify-center rounded-md bg-gray-300 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-white"
      >
        {hasCurrentLocker ? '반납하기' : '신청하기'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onApply}
      disabled={!hasSelection || isPending}
      className={mergeStyles(
        'flex h-[3.25rem] w-full items-center justify-center rounded-md px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] transition-colors',
        hasSelection && !isPending
          ? 'cursor-pointer bg-gray-700 text-white'
          : 'cursor-not-allowed bg-gray-300 text-white',
      )}
    >
      {hasCurrentLocker ? '반납하기' : '신청하기'}
    </button>
  );
};
