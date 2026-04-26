import { CTAButton } from '@causw/cds';

interface LockerApplyButtonProps {
  onClick: () => void;
}

export const LockerApplyButton = ({ onClick }: LockerApplyButtonProps) => {
  return (
    <CTAButton fullWidth type="button" color="blue" onClick={onClick}>
      사물함 신청하기
    </CTAButton>
  );
};
