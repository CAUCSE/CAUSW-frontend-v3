import { CTAButton, Modal } from '@causw/cds';

interface CloseConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const CloseConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
}: CloseConfirmModalProps) => (
  <Modal open={open} onOpenChange={onOpenChange}>
    <Modal.Content>
      <Modal.Title textAlign="center">작성을 그만두시겠어요?</Modal.Title>
      <Modal.Footer>
        <Modal.Close asChild>
          <CTAButton color="light" fullWidth>
            취소
          </CTAButton>
        </Modal.Close>
        <Modal.ActionButton color="dark" onClick={onConfirm}>
          나가기
        </Modal.ActionButton>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
);
