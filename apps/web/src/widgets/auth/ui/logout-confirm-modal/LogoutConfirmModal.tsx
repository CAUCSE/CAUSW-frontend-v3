'use client';

import { Modal } from '@causw/cds';

interface LogoutConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title className="typo-subtitle-16-bold">
          로그아웃 하시겠어요?
        </Modal.Title>
        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="light">취소</Modal.ActionButton>
          </Modal.Close>
          <Modal.Close asChild>
            <Modal.ActionButton color="dark" onClick={onConfirm}>
              로그아웃
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
