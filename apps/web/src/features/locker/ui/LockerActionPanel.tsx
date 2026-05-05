import { CTAButton } from '@causw/cds';

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
        <CTAButton
          type="button"
          onClick={onReturn}
          disabled={isPending}
          color="dark"
          fullWidth
        >
          반납하기
        </CTAButton>
        <CTAButton
          type="button"
          onClick={onExtend}
          disabled={!canExtend || isPending}
          color="dark"
          fullWidth
        >
          연장하기
        </CTAButton>
      </div>
    );
  }

  if (!canApply) {
    return (
      <CTAButton type="button" disabled color="dark" fullWidth>
        {hasCurrentLocker ? '반납하기' : '신청하기'}
      </CTAButton>
    );
  }

  return (
    <CTAButton
      type="button"
      fullWidth
      color="dark"
      onClick={onApply}
      disabled={!hasSelection || isPending}
    >
      {hasCurrentLocker ? '반납하기' : '신청하기'}
    </CTAButton>
  );
};
