import { ActionHeader } from '@/shared/ui';

interface EnrollmentVerificationActionHeaderProps {
  isSubmitDisabled: boolean;
  onCancel: () => void;
}

export const EnrollmentVerificationActionHeader = ({
  isSubmitDisabled,
  onCancel,
}: EnrollmentVerificationActionHeaderProps) => {
  return (
    <ActionHeader>
      <ActionHeader.BackButton type="button" onClick={onCancel}>
        뒤로
      </ActionHeader.BackButton>
      <ActionHeader.ActionButton
        type="submit"
        buttonColor="blue"
        disabled={isSubmitDisabled}
      >
        제출하기
      </ActionHeader.ActionButton>
    </ActionHeader>
  );
};
