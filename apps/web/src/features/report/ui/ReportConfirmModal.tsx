import { ConfirmModal } from '@/shared/ui';

interface ReportConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ReportConfirmModal = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: ReportConfirmModalProps) => {
  return (
    <ConfirmModal
      title={title}
      message={description + `\n\n허위 신고 시 제재될 수 있습니다.`}
      open={open}
      onOpenChange={onClose}
      onConfirm={onConfirm}
      confirmColor="red"
      textAlign="left"
    />
  );
};
