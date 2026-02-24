import { Modal } from '@causw/cds';

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
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content className="w-[min(312px,calc(100%-32px))]">
        <Modal.Title textAlign="left">{title}</Modal.Title>
        <Modal.Description
          textAlign="left"
          className="mt-3 whitespace-pre-wrap"
        >
          {description} {`\n\n허위 신고 시 제재될 수 있습니다.`}
        </Modal.Description>

        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="light" onClick={onClose}>
              취소
            </Modal.ActionButton>
          </Modal.Close>
          <Modal.Close asChild>
            <Modal.ActionButton color="red" onClick={onConfirm}>
              확인
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
