'use client';

import { Modal, Text } from '@causw/cds';

interface LockerAutoReturnNoticeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LockerAutoReturnNoticeModal = ({
  open,
  onOpenChange,
}: LockerAutoReturnNoticeModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="w-[min(312px,calc(100%-32px))]">
        <Modal.Title textAlign="center">
          <Text typography="subtitle-16-bold" textColor="gray-800">
            이용 기간이 만료되어
            <br />
            사물함이 자동 반납되었습니다.
          </Text>
        </Modal.Title>
        <Modal.Footer>
          <Modal.Close asChild>
            <Modal.ActionButton color="dark" fullWidth>
              확인
            </Modal.ActionButton>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
