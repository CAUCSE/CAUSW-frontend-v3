import { Button } from '@causw/cds';

interface LockerApplyButtonProps {
  onClick: () => void;
}

export const LockerApplyButton = ({ onClick }: LockerApplyButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="mt-4 h-[3.25rem] w-full rounded-lg bg-blue-100 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-blue-700"
    >
      사물함 신청하기
    </Button>
  );
};
