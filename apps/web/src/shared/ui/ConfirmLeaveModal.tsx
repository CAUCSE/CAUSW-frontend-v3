'use client';

import { useRouter } from 'next/navigation';

import { Modal, Text } from '@causw/cds';

interface ConfirmLeaveModalProps {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ConfirmLeaveModal = ({
  message,
  open,
  setOpen,
}: ConfirmLeaveModalProps) => {
  const router = useRouter();

  const handleClose = () => setOpen(false);
  const handleLeave = () => router.back();

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="w-[min(312px,calc(100%-32px))]">
        <Modal.Title className="sr-only">작성 취소 확인</Modal.Title>
        <Modal.Description className="m-0">
          <Text typography="subtitle-16-bold" textColor="gray-800">
            {message}
          </Text>
        </Modal.Description>

        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="light" onClick={handleClose}>
              취소
            </Modal.ActionButton>
          </Modal.Close>
          <Modal.Close asChild>
            <Modal.ActionButton color="dark" onClick={handleLeave}>
              확인
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
