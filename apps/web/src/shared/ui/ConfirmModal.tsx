'use client';

import { Modal, Text } from '@causw/cds';

interface ConfirmModalProps {
  title?: string;
  message: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  title,
  message,
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="w-[min(312px,calc(100%-32px))]">
        {title && <Modal.Title>{title}</Modal.Title>}
        {!title && <Modal.Title className="sr-only">확인 모달</Modal.Title>}
        <Modal.Description className="m-0">
          <Text typography="subtitle-16-bold" textColor="gray-800">
            {message}
          </Text>
        </Modal.Description>

        <Modal.Footer>
          <Modal.ActionButton color="light" onClick={handleCancel}>
            {cancelText}
          </Modal.ActionButton>
          <Modal.ActionButton color="dark" onClick={handleConfirm}>
            {confirmText}
          </Modal.ActionButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
