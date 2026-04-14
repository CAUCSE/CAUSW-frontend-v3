'use client';

import { type ComponentProps } from 'react';

import { Modal, Text } from '@causw/cds';

type TitleTypo = ComponentProps<typeof Text>['typography'];
type ModalButtonColor = ComponentProps<typeof Modal.ActionButton>['color'];

interface ConfirmModalProps {
  title?: string;
  message?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  titleTypo?: TitleTypo;
  confirmColor?: ModalButtonColor;
  textAlign?: 'left' | 'center' | 'right';
  danger?: boolean;
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
  titleTypo = 'subtitle-18-bold',
  confirmColor = 'dark',
  textAlign = 'center',
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
        {title && (
          <Modal.Title textAlign={textAlign}>
            <Text typography={titleTypo} textColor="gray-800">
              {title}
            </Text>
          </Modal.Title>
        )}
        {!title && <Modal.Title className="sr-only">확인 모달</Modal.Title>}

        {message && (
          <Modal.Description
            textAlign={textAlign}
            className="mt-3 whitespace-pre-wrap"
          >
            {message}
          </Modal.Description>
        )}

        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="light" onClick={handleCancel}>
              {cancelText}
            </Modal.ActionButton>
          </Modal.Close>
          <Modal.Close asChild>
            <Modal.ActionButton color={confirmColor} onClick={handleConfirm}>
              {confirmText}
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
