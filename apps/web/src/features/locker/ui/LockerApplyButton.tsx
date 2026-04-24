interface LockerApplyButtonProps {
  onClick: () => void;
}

export const LockerApplyButton = ({ onClick }: LockerApplyButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 flex h-[3.25rem] w-full cursor-pointer items-center justify-center rounded-lg bg-blue-100 px-2 text-[0.9375rem] font-semibold tracking-[-0.01875rem] text-blue-700"
    >
      사물함 신청하기
    </button>
  );
};
