import { Modal } from '@causw/cds';

interface SessionKeepConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (value: boolean) => void;
}

export const SessionKeepConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
}: SessionKeepConfirmDialogProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title textAlign="left">
          로그인 상태를 유지하시겠어요?
        </Modal.Title>
        <Modal.Description textAlign="left" className="text-gray-600">
          공용 PC에서는 로그인 상태 유지를 권장하지 않습니다.
        </Modal.Description>
        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="light" onClick={() => onConfirm(false)}>
              이번만 로그인
            </Modal.ActionButton>
          </Modal.Close>
          <Modal.Close asChild>
            <Modal.ActionButton color="dark" onClick={() => onConfirm(true)}>
              로그인 상태 유지
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
